package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

/**
 * Clase intermedia entre la interfaz de graficos y su implementacion
 *
 * Se encarga de gestionar el reescalado y traslacion necesarios para
 * mantener siempre la misma relacion de aspecto
 */
public abstract class AbstractGraphics implements GraphicsInterface {
    public static float PROPORTION_ = 9.0f/16.0f;
    public static float factor_;                    // factor de escalado

    protected static int offsetX_, offsetY_;        // bandas negras
    protected static int logicWidth_, logicHeight_; // dimensiones de la ventana logica del juego

    // dimensiones 'imaginarias' de la ventana del juego
    // para la logica del juego, su ventana tendra estas dimensiones
    protected static int GAME_WIDTH_ = 1080, GAME_HEIGHT_ = 1920;

    /**
     * Dadas las dimensiones reales de la ventana, establece las dimensiones
     * logicas donde se pintara el juego
     */
    protected static void scaleCanvas(int winWidth, int winHeight){
        float myProportion = (float)winWidth/ (float)winHeight;

        // ventana mas larga que la proporcion -> bandas arriba y abajo
        if(PROPORTION_ > myProportion){
            logicWidth_ = winWidth;
            logicHeight_ = (int)(logicWidth_/PROPORTION_);
            offsetX_ = 0;
            offsetY_ = (winHeight/2) - (logicHeight_/2);
            factor_ = (float)logicHeight_/(float)GAME_HEIGHT_;
        }
        // ventana mas ancha que la proporcion -> bandas a los lados
        else if(PROPORTION_ < myProportion){
            logicHeight_ = winHeight;
            logicWidth_ = (int)(logicHeight_*PROPORTION_);
            offsetY_ = 0;
            offsetX_ = (winWidth/2) - (logicWidth_/2);
            factor_ = (float)logicWidth_/(float)GAME_WIDTH_;
        }
    }

    
    // transformacion de coordenadas de un sistema a otro:

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

    public int getGameWidth(){return GAME_WIDTH_;}
    public int getGameHeight(){return GAME_HEIGHT_;}
}
