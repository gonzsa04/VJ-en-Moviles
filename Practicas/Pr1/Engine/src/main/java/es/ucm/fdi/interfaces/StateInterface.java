package es.ucm.fdi.interfaces;

/**
 * Interfaz de los estados que ejecutara el motor
 *
 * Todos tendran un metodo para actualizar su logica, para pintarse
 * para manejar eventos y para restaurarse
 *
 * Los estados de logica que queramos ejecutar en el motor
 * deberan implementar esta interfaz
 */
public interface StateInterface {
    public void init();
    public void update(double deltaTime);
    public void render();
    public void handleInput();
    public void reset();
}
