package es.ucm.fdi.interfaces;

/**
 * Interfaz encargada del dibujado
 */
public interface GraphicsInterface {
    public ImageInterface newImage(String name);
    public void clear(int color);

    /**dibuja transformando y escalando a coordenadas logicas*/
    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha);
    /**dibuja en posiciones y escalas fisicas de la ventana*/
    public void drawImageRaw(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha);

    /** @return ancho real de la ventana */
    public int getWindowWidth();
    /** @return alto real de la ventana */
    public int getWindowHeight();

    /** @return ancho logico de la ventana (juego) */
    public int getGameWidth();
    /** @return alto logico de la ventana (juego) */
    public int getGameHeight();
}
