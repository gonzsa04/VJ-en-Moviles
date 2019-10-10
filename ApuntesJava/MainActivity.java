package es.ucm.fdi.moviles.HoliMundo;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.content.Context;

import java.io.IOException;
import java.io.InputStream;
// pulsar sobre algo y Alt+Enter para que añada su import

// si queremos meter imagenes, habra que ponerlas en res para que al hacer la build ocupen su lugar en el .apk
// habra que crear un directorio adicional de assets que android reconozca. Clic drch en app add folder assets folder
// click drch en assets, show in exlorer y arrastramos las imagenes dentro

// en android se sincroniza con el monitor, por lo que no habra que hacer toda la parafernalia del doble buffer
// pero no debemos hacer el pintado pasivo, ya que si tarda mucho en responder android matara la tarea (NO BLOQUEAR LA HEBRA DEL GUI)
// hacer active rendering como en java -> habra que crear una hebra a mano para no retener a la del GUI. Las hebras que creemos hay
// que pararlas cuando se cierre la app SIEMPRE
// en android solo hay una hebra -> la del GUI
// en java habia dos hebras -> la de swing y la del main (de la que nos adueñabamos con nuestro bucle)

public class MainActivity extends AppCompatActivity {
    private Button boton;
    private int numVeces;

    class MyView extends View{ // equivalente a Paint en java. Para probar, haremos que esta sea ademas nuestra hebra. En la practica SEPARADO
        public MyView(Context context){
            super(context);
        }
        public void onDraw(Canvas c){
            c.drawColor(0xFF0000FF); // ARGB
            if(sprite != null)
                c.drawBitmap(sprite, ++x, 100, null);
            invalidate(); // para repintar (igual que cuand haciamos el pintado pasivo)
        }
    }
    int x = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*boton = new Button(this);
        boton.setText("Pulsame");
        boton.setOnClickListener(new View.OnClickListener(){
            ++numVeces;
            boton.setText("Pulsado " + numVeces + " veces");
            android.util.Log.i("pulsame", "" + numVeces);
        });
        setContentView(boton);*/

        InputStream inputStream = null;
        try{
            AssetManager assetManager = this.getAssets();
            inputStream = assetManager.open("javaImage.jpg");
            sprite = BitmapFactory.decodeStream(inputStream);
        }
        catch(IOException io){
            android.util.Log.e("MainActivity", "Error leyendo imagen");
        }
        finally{
            try{
                inputStream.close();
            }
            catch(Exception io){}
        }
        setContentView(new MyView(this));
    }
    Bitmap sprite;
}
