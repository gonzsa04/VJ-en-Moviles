package es.ucm.fdi.moviles.androidversion;
import es.ucm.fdi.moviles.interfaces.Graphics;
import es.ucm.fdi.moviles.androidversion.AndroidImage;
import es.ucm.fdi.moviles.interfaces.Image;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.*;
import java.io.IOException;
import java.io.InputStream;

public class AndroidGraphics implements Graphics {

    private Context context_;
    private Canvas canvas_;

    public AndroidGraphics(Context context, Canvas canvas){
        context_ = context;
        canvas_ = canvas;
    }

    public Image newImage(String name){
        AndroidImage image = null;
        InputStream inputStream = null;
        try{
            AssetManager assetManager = context_.getAssets();
            inputStream = assetManager.open(name);
            image = new AndroidImage(BitmapFactory.decodeStream(inputStream));
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

    public void drawImage(Image image, int alpha){
        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(AndroidImage.class.cast(image).getBitmap(), 0, 0, paint);
    }

    public void drawImage(Image image, float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        Rect src = new Rect(0, 0, image.getWidth(), image.getHeight());
        RectF dst = new RectF(dstLeft, dstTop, dstRight, dstBottom);
        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(AndroidImage.class.cast(image).getBitmap(), src, dst, paint);
    }

    public void drawImage(Image image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        Rect src = new Rect(srcLeft, srcTop, srcRight, srcBottom);
        RectF dst = new RectF(dstLeft, dstTop, dstRight, dstBottom);
        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(AndroidImage.class.cast(image).getBitmap(), src, dst, paint);
    }

    public int getWidth(){return canvas_.getWidth();}
    public int getHeight(){return canvas_.getHeight();}
}
