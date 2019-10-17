package es.ucm.fdi.moviles.interfaces;

public interface Graphics {
    public Image newImage(String name);
    public void clear(int color);
    public void drawImage(Image image, int alpha);
    public void drawImage(Image image, float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha);
    public void drawImage(Image image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha);
    public int getWidth();
    public int getHeight();
}
