package es.ucm.fdi.interfaces;

public interface GraphicsInterface {
    public ImageInterface newImage(String name);
    public void clear(int color);
    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha);
    public int getWindowWidth();
    public int getWindowHeight();
    public int getLogicWidth();
    public int getLogicHeight();
}
