package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

public abstract class AbstractGraphics implements GraphicsInterface {
    public static float PROPORTION_ = 9.0f/16.0f;
    public static float factor_;

    protected static int offsetX_, offsetY_;
    protected static int logicWidth_, logicHeight_;
    protected static int DEFAULT_WIDTH_ = 1080, DEFAULT_HEIGHT_ = 1920;

    protected static void scaleCanvas(int winWidth, int winHeight){
        float myProportion = (float)winWidth/ (float)winHeight;
        if(PROPORTION_ > myProportion){
            logicWidth_ = winWidth;
            logicHeight_ = (int)(logicWidth_/PROPORTION_);
            offsetX_ = 0;
            offsetY_ = (winHeight/2) - (logicHeight_/2);
            factor_ = (float)logicHeight_/(float)DEFAULT_HEIGHT_;
        }
        else if(PROPORTION_ < myProportion){
            logicHeight_ = winHeight;
            logicWidth_ = (int)(logicHeight_*PROPORTION_);
            offsetY_ = 0;
            offsetX_ = (winWidth/2) - (logicWidth_/2);
            factor_ = (float)logicWidth_/(float)DEFAULT_WIDTH_;
        }
    }

    public static Vector2 physicToLogic(float x, float y){
        x = (x - offsetX_)/factor_;
        y = (y - offsetY_)/factor_;
        return new Vector2(x, y);
    }

    protected static Vector2 logicToPhysic(float x, float y){
        x = x * factor_ + offsetX_;
        y = y * factor_ + offsetY_;
        return new Vector2(x, y);
    }

    protected static Vector2 scaleImage(float right, float bottom){
        right *= factor_;
        bottom *= factor_;
        return new Vector2(right, bottom);
    }
}
