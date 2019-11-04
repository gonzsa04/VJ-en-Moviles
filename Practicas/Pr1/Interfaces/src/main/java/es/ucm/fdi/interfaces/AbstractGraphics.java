package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

public abstract class AbstractGraphics implements GraphicsInterface {
    private float PROPORTION_ = 9.0f/16.0f;
    private float factor_;
    protected int offsetX_, offsetY_, logicWidth_, logicHeight_;
    protected int DEFAULT_WIDTH_ = 1080, DEFAULT_HEIGHT_ = 1920;

    protected void scaleCanvas(int winWidth, int winHeight){
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

    protected Vector2 transalteImage(float left, float top){
        left = left * factor_ + offsetX_;
        top = top * factor_ + offsetY_;
        return new Vector2(left, top);
    }

    protected Vector2 scaleImage(float right, float bottom){
        right *= factor_;
        bottom *= factor_;
        return new Vector2(right, bottom);
    }
}
