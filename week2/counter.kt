package com.example.myapplication

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.runtime.traceEventEnd
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.sp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleObserver
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.findViewTreeLifecycleOwner
import kotlinx.coroutines.delay
import kotlinx.coroutines.selects.whileSelect

@Composable
fun Counter( initalValue: Int = 0) {
    var count by rememberSaveable { mutableStateOf(initalValue) }
    var name by rememberSaveable { mutableStateOf("") }


        LaunchedEffect(Unit) {
        while(true) {
            delay(1000)
            count --
        }
    }

    Column (
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ){
        Text(text = "Enter your name: ", fontSize = 20.sp)
        TextField(
            value = name,
            onValueChange = { name = it },
            placeholder = { Text("Enter your name....") }
        )
        Row() {
            Button( onClick = {
                count++
            }) {
                Text("Increment", fontSize = 30.sp)
            }
            Text( text = count.toString(), fontSize = 30.sp)
        }

    }


}
