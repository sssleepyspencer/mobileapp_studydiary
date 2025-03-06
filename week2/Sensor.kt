package com.example.myapplication

import android.app.Application
import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.unit.sp
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.flow.MutableStateFlow

@Composable
fun SensorDisplay(sensorViewModel: SensorViewModel = viewModel())
{
    val sensorData by sensorViewModel.accelerometerValue.collectAsState()

    Column {
        Text("X: ${sensorData.first}", fontSize = 20.sp)
        Text("Y: ${sensorData.second}", fontSize = 20.sp)
        Text("Z: ${sensorData.third}", fontSize = 20.sp)
    }
}

//Create a viewmodel,which connects Sensor Manager and starts listening data from here

class SensorViewModel(context: Application) : AndroidViewModel(context), SensorEventListener {
    val accelerometerValue = MutableStateFlow(Triple(0f, 0f, 0f))
    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager

    init {
        startAccelerometer()
    }

    private fun startAccelerometer() {
        val accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        if (accelerometer != null) {
            sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event != null) {
            accelerometerValue.value = Triple(event.values[0], event.values[1], event.values[2])
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Do nothing
    }
}
