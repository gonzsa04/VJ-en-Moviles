package es.ucm.fdi.androidversion;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
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

public class AndroidGraphics extends AbstractGraphics implements GraphicsInterface {

    private Context context_;
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

    public void clear(int color){
        canvas_.drawColor(Color.BLACK);
        Paint paint = new Paint();
        paint.setColor(color);
        canvas_.drawRect(offsetX_, offsetY_, logicWidth_ + offsetX_, logicHeight_ + offsetY_, paint);
    }

    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        Vector2 position = transalteImage(dstLeft, dstTop);
        Vector2 scale = scaleImage(dstRight, dstBottom);

        Rect src = new Rect(srcLeft, srcTop, srcRight + srcLeft, srcBottom + srcTop);
        RectF dst = new RectF(position.x, position.y, scale.x + position.x, scale.y + position.y);

        Paint paint = new Paint(); paint.setAlpha(alpha);
        if(image != null)
            canvas_.drawBitmap(AndroidImage.class.cast(image).getBitmap(), src, dst, paint);
    }

    public void scaleCanvas(){
        super.scaleCanvas(getWindowWidth(), getWindowHeight());
    }

    public void setCanvas(Canvas canvas){canvas_ = canvas;}

    public int getWindowWidth(){return canvas_.getWidth();}
    public int getWindowHeight(){return canvas_.getHeight();}
    public int getDefaultWidth(){return DEFAULT_WIDTH_;}
    public int getDefaultHeight(){return DEFAULT_HEIGHT_;}
}
