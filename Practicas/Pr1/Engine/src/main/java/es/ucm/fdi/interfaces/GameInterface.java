package es.ucm.fdi.interfaces;

/**
 * Interfaz del motor que ejecutara el juego
 *
 * Con metodos de acceso a graficos e input y
 * cambiar el estado actual
 */
public interface GameInterface {
    public GraphicsInterface getGraphics();
    public InputInterface getInput();
    public void setState(StateInterface state);
}
