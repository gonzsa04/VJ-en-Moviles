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

import es.ucm.fdi.interfaces.GraphicsInterface;
import es.ucm.fdi.interfaces.ImageInterface;

public class AndroidGraphics extends SurfaceView implements GraphicsInterface {

    private Context context_;
    private Canvas canvas_;

    public AndroidGraphics(Context context){
        super(context);
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

    public void clear(int color){
        canvas_.drawColor(color);
    }

    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        Rect src = new Rect(srcLeft, srcTop, srcRight, srcBottom);
        RectF dst = new RectF(dstLeft, dstTop, dstRight + dstLeft, dstBottom + dstTop);
        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(AndroidImage.class.cast(image).getBitmap(), src, dst, paint);
    }

    public void setCanvas(){
        while(!getHolder().getSurface().isValid());
        canvas_ = getHolder().lockCanvas();
    }
    public void releaseCanvas(){ getHolder().unlockCanvasAndPost(canvas_); }

    public void setCanvasSize(int x, int y){
        //reescalado del espacio de juego
    }

    public int getCanvasWidth(){return canvas_.getWidth();}
    public int getCanvasHeight(){return canvas_.getHeight();}
}
