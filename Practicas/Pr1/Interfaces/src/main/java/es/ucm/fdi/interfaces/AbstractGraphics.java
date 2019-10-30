package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

public abstract class AbstractGraphics implements GraphicsInterface {
    //codigo comun de escalado

    Vector2 scaleImage(Vector2 coords){
        //x e y estan en coordenadas "logicas"
        //de canvas/juego
        coords.x = 0; // las transforma a coord fisicas
        coords.y = 0;
        return coords;
    }
}
