package com.example.myapplication

import android.text.Layout
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.modifier.modifierLocalMapOf
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.app.NotificationCompat.MessagingStyle.Message


@Composable
fun confirmationDialog( message: String) {
    Column (
        modifier = Modifier.fillMaxWidth().padding(16.dp).border(width = 2.dp, color = Color.Blue).background(Color.Gray),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
        ) {
        Text( message, fontSize = 18.sp, fontFamily = FontFamily.Serif)
        Row {
            Button(onClick = {/* DO something here */}) {
                Text("Confirm")
            }
            Button(onClick = {/* Do something here */}) {
                Text("Cancel")
            }
        }
    }
}

@Preview
@Composable
fun ConfirmationDialogPreview() {
    confirmationDialog("Are you sure you want to delete this item?")
}
