package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

public abstract class AbstractGraphics implements GraphicsInterface {
    private float PROPORTION_ = 9.0f/16.0f;
    private float scale_;
    protected int offsetX_, offsetY_, logicWidth_, logicHeight_;

    protected void scaleCanvas(int winWidth, int winHeight){
        float myProportion = (float)winWidth/ (float)winHeight;
        if(PROPORTION_ > myProportion){
            logicWidth_ = winWidth;
            logicHeight_ = (int)(logicWidth_/PROPORTION_);
            offsetX_ = 0;
            offsetY_ = (winHeight/2) - (logicHeight_/2);
            scale_ = (float)logicHeight_/(float)winHeight;
        }
        else if(PROPORTION_ < myProportion){
            logicHeight_ = winHeight;
            logicWidth_ = (int)(logicHeight_*PROPORTION_);
            offsetY_ = 0;
            offsetX_ = (winWidth/2) - (logicWidth_/2);
            scale_ = (float)logicWidth_/(float)winWidth;
        }
    }

    protected Vector2 transalteImage(float left, float top){
        left += offsetX_;
        top += offsetY_;
        return new Vector2(left, top);
    }

    protected Vector2 scaleImage(float right, float bottom){
        right *= scale_;
        bottom *= scale_;
        return new Vector2(right, bottom);
    }
}
