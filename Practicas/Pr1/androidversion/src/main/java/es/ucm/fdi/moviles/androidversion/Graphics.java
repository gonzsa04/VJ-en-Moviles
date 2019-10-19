package es.ucm.fdi.moviles.androidversion;

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

import es.ucm.fdi.moviles.interfaces.GraphicsInterface;
import es.ucm.fdi.moviles.interfaces.ImageInterface;

public class Graphics extends SurfaceView implements GraphicsInterface {

    private Context context_;
    private Canvas canvas_;

    public Graphics(Context context){
        super(context);
        context_ = context;
    }

    public ImageInterface newImage(String name){
        Image image = null;
        InputStream inputStream = null;
        try{
            AssetManager assetManager = context_.getAssets();
            inputStream = assetManager.open(name);
            image = new Image(BitmapFactory.decodeStream(inputStream));
        }
        catch(IOException io){
            android.util.Log.e("Graphics", "Error leyendo imagen");
        }
        finally{
            try{
                inputStream.close();
            }
            catch(Exception io){}
        }
        return image;
    }

    public void clear(int color){
        canvas_.drawColor(color);
    }

    public void drawImage(ImageInterface image, int alpha){
        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(Image.class.cast(image).getBitmap(), 0, 0, paint);
    }

    public void drawImage(ImageInterface image, float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        Rect src = new Rect(0, 0, image.getWidth(), image.getHeight());
        RectF dst = new RectF(dstLeft, dstTop, dstRight + dstLeft, dstBottom + dstTop);
        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(Image.class.cast(image).getBitmap(), src, dst, paint);
    }

    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        Rect src = new Rect(srcLeft, srcTop, srcRight, srcBottom);
        RectF dst = new RectF(dstLeft, dstTop, dstRight + dstLeft, dstBottom + dstTop);
        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(Image.class.cast(image).getBitmap(), src, dst, paint);
    }

    public void setCanvas(){
        while(!getHolder().getSurface().isValid());
        canvas_ = getHolder().lockCanvas();
    }
    public void releaseCanvas(){ getHolder().unlockCanvasAndPost(canvas_); }

    public int getCanvasWidth(){return canvas_.getWidth();}
    public int getCanvasHeight(){return canvas_.getHeight();}
}
