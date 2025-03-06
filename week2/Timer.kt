package com.example.myapplication

@Composable
fun Timer() {
    val timerViewModel: TimerViewModel = viewModel()
    val elapsedTime by timerViewModel.elapsedTimeInSeconds.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Seconds Elapsed: $elapsedTime",
            fontSize = 30.sp
        )

        Spacer(modifier = Modifier.height(16.dp))

        Row(
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(onClick = { timerViewModel.pauseTimer() }) {
                Text("Pause", fontSize = 20.sp)

                Spacer(modifier = Modifier.width(16.dp))

                Button(onClick = { timerViewModel.resumeTimer() }) {
                    Text("Resume", fontSize = 20.sp)
                }

                Spacer(modifier = Modifier.width(16.dp))

                Button(onClick = { timerViewModel.resetTimer() }) {
                    Text("Reset", fontSize = 20.sp)
                }
            }
        }
    }

    class TimerViewModel : ViewModel() {
        private val _elapsedTimeInSeconds = MutableStateFlow(0)
        val elapsedTimeInSeconds: StateFlow<Int> = _elapsedTimeInSeconds.asStateFlow()

        private var isTimerRunning = true

        init {
            startTimer()
        }

        private fun startTimer() {
            viewModelScope.launch {
                while (true) {
                    if (isTimerRunning) {
                        delay(1000) // 每秒延迟
                        _elapsedTimeInSeconds.value += 1
                    }
                }
            }
        }

        fun pauseTimer() {
            isTimerRunning = false
        }

        fun resumeTimer() {
            isTimerRunning = true
        }

        fun resetTimer() {
            _elapsedTimeInSeconds.value = 0
        }
    }
