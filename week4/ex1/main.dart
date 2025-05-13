import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'JSON List Example',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const SimpleListPage(),
    );
  }
}

class SimpleListPage extends StatefulWidget {
  const SimpleListPage({Key? key}) : super(key: key);

  @override
  _SimpleListPageState createState() => _SimpleListPageState();
}

class _SimpleListPageState extends State<SimpleListPage> {
  List<dynamic> _items = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      // Load from local assets
      final jsonString = await rootBundle.loadString('assets/data.json');
      final jsonData = jsonDecode(jsonString);

      setState(() {
        _items = jsonData;
        _isLoading = false;
      });
    } catch (e) {
      print('Error loading data: $e');
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Simple JSON List')),
      body:
          _isLoading
              ? const Center(child: CircularProgressIndicator())
              : ListView.builder(
                itemCount: _items.length,
                itemBuilder: (context, index) {
                  final item = _items[index];
                  return ListTile(
                    leading: Icon(Icons.person),
                    title: Text(item['name'] ?? 'Unknown'),
                    subtitle: Text(item['email'] ?? 'No email'),
                    trailing: Text(item['phone'] ?? 'No phone'),
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Selected: ${item['name']}')),
                      );
                    },
                  );
                },
              ),
    );
  }
}
