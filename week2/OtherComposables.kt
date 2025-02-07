import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Preview
@Composable
fun HelloApp() {
    Column(
        modifier = Modifier.fillMaxSize().background(Color.LightGray),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        MyOtherComponent("My demo App")
        Spacer(modifier = Modifier.padding(16.dp).height(50.dp))
        Text(
            "Hello,Tamk 2025",
            fontSize = 50.sp,
            color = Color.Green

        )
        Button(onClick = { /* Do something here */ }) {
            Text("Click me", fontSize = 30.sp)


        }
    }
}

@Composable
fun MyOtherComponent(title: String) {

    Text(
        text = title,
        fontSize = 50.sp,
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .background(Color.Yellow)
    )

}
