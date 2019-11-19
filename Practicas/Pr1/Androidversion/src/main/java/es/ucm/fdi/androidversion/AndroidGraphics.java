package es.ucm.fdi.androidversion;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.RectF;
import android.view.SurfaceView;

import java.io.IOException;
import java.io.InputStream;

import es.ucm.fdi.interfaces.AbstractGraphics;
import es.ucm.fdi.interfaces.GraphicsInterface;
import es.ucm.fdi.interfaces.ImageInterface;
import es.ucm.fdi.utils.Vector2;

/**
 * Implementacion de la interfaz grafica para la plataforma Android
 */
public class AndroidGraphics extends AbstractGraphics implements GraphicsInterface {

    private Context context_;
    private SurfaceView surfaceView_;  // recibido desde el motor del juego
    private Canvas canvas_;

    public AndroidGraphics(Context context){
        context_ = context;
    }

    public ImageInterface newImage(String name){
        AndroidImage image = null;
        InputStream inputStream = null;
        try{
            AssetManager assetManager = context_.getAssets();
            inputStream = assetManager.open(name);
            image = new AndroidImage(BitmapFactory.decodeStream(inputStream));
        }
        catch(IOException io){
            android.util.Log.e("AndroidGraphics", "Error leyendo imagen");
        }
        finally{
            if(inputStream != null) {
                try {
                    inputStream.close();
                } catch (Exception io) {
                }
            }
        }
        return image;
    }

    private int addAlphaChannel(int myColor, int alpha){
        myColor = myColor & 0x00ffffff;
        return (alpha << 24) | myColor;
    }

    public void clear(int color){
        color = addAlphaChannel(color, 0xff);
        canvas_.drawColor(color);
    }

    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        // reposicionamiento y reescalado -> ASPECT-RATIO
        Vector2 position = logicToPhysic(dstLeft, dstTop);
        Vector2 scale = scaleImage(dstRight, dstBottom);

        Rect src = new Rect(srcLeft, srcTop, srcRight + srcLeft, srcBottom + srcTop);
        RectF dst = new RectF(position.x, position.y, scale.x + position.x, scale.y + position.y);

        // clamp de alpha, ya que al salirse del intervalo se invierte
        if(alpha < 0) alpha = 0;
        else if (alpha > 255) alpha = 255;

        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(((AndroidImage)image).getBitmap(), src, dst, paint);
    }

    public void drawImageRaw(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        Rect src = new Rect(srcLeft, srcTop, srcRight + srcLeft, srcBottom + srcTop);
        RectF dst = new RectF(dstLeft, dstTop, dstRight + dstLeft, dstBottom + dstTop);

        // clamp de alpha, ya que al salirse del intervalo se invierte
        if(alpha < 0) alpha = 0;
        else if (alpha > 255) alpha = 255;

        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(((AndroidImage)image).getBitmap(), src, dst, paint);
    }

    public void setSurfaceView(SurfaceView surfaceView){surfaceView_ = surfaceView;}

    // ASPECT-RATIO
    public void scaleCanvas(){
        super.scaleCanvas(getWindowWidth(), getWindowHeight());
    }

    // lock canvas -> adquiere valor a traves de surfaceView
    public void startFrame(){
        while(!surfaceView_.getHolder().getSurface().isValid());
        canvas_ = surfaceView_.getHolder().lockHardwareCanvas();
    }

    // unclock canvas -> se libera
    public void endFrame(){ surfaceView_.getHolder().unlockCanvasAndPost(canvas_); }

    public int getWindowWidth(){return surfaceView_.getWidth();}
    public int getWindowHeight(){return surfaceView_.getHeight();}
}
