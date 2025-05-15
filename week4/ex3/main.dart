import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Movie Example',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const MovieListPage(),
    );
  }
}

class MovieListPage extends StatefulWidget {
  const MovieListPage({Key? key}) : super(key: key);

  @override
  _MovieListPageState createState() => _MovieListPageState();
}

class Movie {
  final String id;
  final String title;
  final String director;
  final int year;
  final String posterUrl;
  final double rating;
  final String genre;

  Movie({
    required this.id,
    required this.title,
    required this.director,
    required this.year,
    required this.posterUrl,
    required this.rating,
    required this.genre,
  });

  factory Movie.fromFirestore(DocumentSnapshot doc) {
    Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
    
    // For posterUrl, check if it's a full URL or just a filename
    String posterPath = data['posterUrl'] ?? '';
    if (!posterPath.startsWith('http') && !posterPath.startsWith('assets/')) {
      // If it's just a number or filename, assume it's in assets/images
      posterPath = 'assets/images/$posterPath.jpg';
    }
    
    return Movie(
      id: doc.id,
      title: data['title'] ?? '',
      director: data['director'] ?? '',
      year: data['year'] is int ? data['year'] : int.parse(data['year'].toString()),
      posterUrl: posterPath,
      rating: data['rating'] != null ? (data['rating'] as num).toDouble() : getDefaultRating(doc.id),
      genre: data['genre'] ?? getDefaultGenre(data['title'] ?? ''),
    );
  }
  
  // Helper method to get default ratings for movies
  static double getDefaultRating(String id) {
    Map<String, double> ratings = {
      'the-shawshank-redemption': 9.3,
      'the-godfather': 9.2,
      'the-dark-knight': 9.0,
      'pulp-fiction': 8.9,
      'the-lord-of-the-rings-the-return-of-the-king': 9.0,
      'inception': 8.8
    };
    return ratings[id] ?? 7.0;
  }
  
  // Helper method to assign genres based on movie titles
  static String getDefaultGenre(String title) {
    if (title.contains('Godfather')) return 'Crime, Drama';
    if (title.contains('Lord of the Rings')) return 'Adventure, Fantasy';
    if (title.contains('Dark Knight')) return 'Action, Crime, Drama';
    if (title.contains('Inception')) return 'Action, Adventure, Sci-Fi';
    if (title.contains('Pulp Fiction')) return 'Crime, Drama';
    if (title.contains('Shawshank')) return 'Drama';
    return 'Drama';
  }
}

class _MovieListPageState extends State<MovieListPage> {
  late Stream<QuerySnapshot> _moviesStream;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _moviesStream = FirebaseFirestore.instance.collection('movies').orderBy('title').snapshots();
    // Set loading to false when stream is active
    Future.delayed(Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Popular Movies'), 
        elevation: 0,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : StreamBuilder<QuerySnapshot>(
              stream: _moviesStream,
              builder: (context, snapshot) {
                if (snapshot.hasError) {
                  return Center(
                    child: Text('Error: ${snapshot.error}'),
                  );
                }

                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                  return const Center(
                    child: Text('No movies found'),
                  );
                }

                List<Movie> movies = snapshot.data!.docs
                    .map((doc) => Movie.fromFirestore(doc))
                    .toList();

                return ListView.builder(
                  itemCount: movies.length,
                  itemBuilder: (context, index) {
                    final movie = movies[index];
                    return Card(
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      elevation: 4,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Container(
                        height: 200,
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Movie Poster
                            ClipRRect(
                              borderRadius: const BorderRadius.only(
                                topLeft: Radius.circular(12),
                                bottomLeft: Radius.circular(12),
                              ),
                              child: Image.asset(
                                movie.posterUrl,
                                width: 135,
                                height: 200,
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) {
                                  print('Error loading image: $error');
                                  return Container(
                                    width: 135,
                                    height: 200,
                                    color: Colors.grey[300],
                                    child: const Center(
                                      child: Icon(Icons.movie, size: 50),
                                    ),
                                  );
                                },
                              ),
                            ),
                            // Movie Details
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(12),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      movie.title,
                                      style: const TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      'Directed by: ${movie.director}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.grey[700],
                                      ),
                                    ),
                                    Text(
                                      'Released: ${movie.year}',
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.grey[700],
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      'Genre: ${movie.genre}',
                                      style: const TextStyle(fontSize: 14),
                                    ),
                                    const Spacer(),
                                    // Rating Bar
                                    Row(
                                      children: [
                                        const Icon(
                                          Icons.star,
                                          color: Colors.amber,
                                          size: 20,
                                        ),
                                        const SizedBox(width: 4),
                                        Text(
                                          '${movie.rating}/10',
                                          style: const TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addSampleMoviesToFirestore,
        child: Icon(Icons.add),
        tooltip: 'Add sample movies to Firestore',
      ),
    );
  }
  
  // Helper method to add sample movies to Firestore if the collection is empty
  void _addSampleMoviesToFirestore() async {
    try {
      // Check if the collection is empty
      final QuerySnapshot snapshot = await FirebaseFirestore.instance.collection('movies').limit(1).get();
      
      if (snapshot.docs.isEmpty) {
        final List<Map<String, dynamic>> sampleMovies = [
          {
            'title': 'The Shawshank Redemption',
            'director': 'Frank Darabont',
            'year': 1994,
            'posterUrl': '1',  // This will be mapped to assets/images/1.jpg
            'genre': 'Drama',
            'rating': 9.3,
          },
          {
            'title': 'The Godfather',
            'director': 'Francis Ford Coppola',
            'year': 1972,
            'posterUrl': '2',  // This will be mapped to assets/images/2.jpg
            'genre': 'Crime, Drama',
            'rating': 9.2,
          },
          {
            'title': 'The Dark Knight',
            'director': 'Christopher Nolan',
            'year': 2008,
            'posterUrl': '3',  // This will be mapped to assets/images/3.jpg
            'genre': 'Action, Crime, Drama',
            'rating': 9.0,
          },
          {
            'title': 'Pulp Fiction',
            'director': 'Quentin Tarantino',
            'year': 1994,
            'posterUrl': '4',  // This will be mapped to assets/images/4.jpg
            'genre': 'Crime, Drama',
            'rating': 8.9,
          },
          {
            'title': 'The Lord of the Rings: The Return of the King',
            'director': 'Peter Jackson',
            'year': 2003,
            'posterUrl': '5',  // This will be mapped to assets/images/5.jpg
            'genre': 'Adventure, Fantasy',
            'rating': 9.0,
          },
          {
            'title': 'Inception',
            'director': 'Christopher Nolan',
            'year': 2010,
            'posterUrl': '6',  // This will be mapped to assets/images/6.jpg
            'genre': 'Action, Adventure, Sci-Fi',
            'rating': 8.8,
          },
        ];
        
        // Add all sample movies to Firestore
        WriteBatch batch = FirebaseFirestore.instance.batch();
        
        for (final movie in sampleMovies) {
          DocumentReference docRef = FirebaseFirestore.instance.collection('movies').doc();
          batch.set(docRef, movie);
        }
        
        await batch.commit();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Sample movies added to Firestore')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Movies already exist in Firestore')),
        );
      }
    } catch (e) {
      print('Error adding sample movies: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to add sample movies: $e')),
      );
    }
  }
}
