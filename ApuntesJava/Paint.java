import javax.swing.JFrame;
import java.awt.*;

// ESTO SON PRUEBAS. TODO ESTO FUNCIONA EN PC, PERO MAS TARDE LO TENDREMOS QUE HACER EN ANDROID. LA PRIMERA PRACTICA CONSISTIRA EN ABSTRAER AMBAS PARTES
// Y JUNTARLAS EN UN CODIGO QUE FUNCIONE EN AMBAS PLATAFORMAS
public class Paint extends JFrame{

    Image _logo;

    double x = 0;
    int incrx = 50;
    int imageWidth = 0;
    
    public Paint (String title){
        super(title);
    }

    public void init() {
        setSize(400,400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setIgnoreRepaint(true); //  nos encargamos de pintar nosotros, no queremos que swing lo haga

        try{ // cargamos una imagen
            _logo = javax.imageio.ImageIO.read(new java.io.File("java.png"));
            imageWidth = _logo.getWidth(null);
        }
        catch(Exception e){
            // lanzar error
        }
    }

    // logica del comportamiento de la imagen
    public void update(double deltaTime){
        x += incrx * deltaTime; // unidades -> pixeles (incrX) por segundo. x no puede ser int -> si tiene que moverse menos de un pixel por segundo, truncara a 0

        // rebote contra los limites de la pantalla
        if(x < 0){
            x = -x;
            incrx = -incrx;
        }
        else if(x > getWidth() - imageWidth){
            x = 2*(getWidth()-imageWidth) - x;
            incrx = -incrx;
        }
    }

    // pintado de la imagen. Recibe un Graphics donde pintara
    public void render(Graphics g){
        g.setColor(Color.blue); // pintamos el fondo, ya que swing no lo hara por nosotros -> hemos ignorado el pintado en init()
        g.fillRect(0,0,400,400);
            
        if(_logo != null){      // pintamos la imagen
            g.drawImage(_logo, (int)x, 10, null);
        }
    }

    // EN ANDROID NO HAY MAIN, habra que lidiar con threads en el futuro
    public static void main(String[] args){
        Paint ventana = new Paint("nombre");
        ventana.init();
        ventana.setVisible(true);

        //---------------------------------------------DOBLE BUFFER (para que no parpadee)-----------------------------------------------------
        // creacion del doble buffer
        int veces = 100;
        do{
            try{                                 // esto puede fallar porque la ventana aun no este preparada desde la llamada a setVisible(true), 
                                                 // ya que se abre otra hebra (swing) que puede no haber acabado
                ventana.createBufferStrategy(2); // doble buffer, uno que se pinta y otro trasero que mientras se rellena con lo siguiente
                break;
            }
            catch(Exception e){}
        }while(veces-- > 0); // se intentara hacer x veces

        if(veces == 0){      // si transcurridos los x intentos no ha funcionado -> error
            System.err.println("El doble buffer no pudo cargarse");
        }
        java.awt.image.BufferStrategy strategy = ventana.getBufferStrategy(); // finalmente, nos guardamos el doble buffer

        //--------------------------------------------------BUCLE PRINCIPAL-----------------------------------------------------------------------
        long lastFrameTime = System.nanoTime(); // si pusieramos int no cabria mas de unos dos segundos (recordar que es nano -> 9 ceros)

        while(true){ // haremos bucles de renderizado y logica. SEPARAR METODOS DE RENDER Y UPDATE EN OTRA CLASE, no todo dentro de la clase que hereda de JFrame
            //--------------------------------------------UPDATE-----------------------------------------------------
            long currentTime = System.nanoTime();
            double deltaTime = (double)((currentTime - lastFrameTime)/1.0E9); // deltaTime en segundos, como en Unity
            lastFrameTime = currentTime;

            ventana.update(deltaTime); // resta = deltaTime. Lo pasamos a milisegundos

            //--------------------------------------------RENDER-------------------------------------------------------
            //Graphics g = ventana.getGraphics(); // hay que pedirle Graphics a la ventana, modificarlo y luego devolverselo
            do{
                do{
                    Graphics g = strategy.getDrawGraphics(); // en vez de pedirselo a la ventana, pedimos el buffer de dibujado a la strategy (donde puedo pintar)
                    try{ ventana.render(g); }
                    // no hay catch(...) porque no hay que declarar TODAS las excepciones -> los errores de programacion como salirnos de un vector, etc. no hay que declararlas
                    // solo si peta al cargar cosas, etc., como en init() al cargar la imagen
                    // asi nos asegurmos de que esto se ejecute siempre -> libera la variable graphics de ventana, si no habra leaks!!
                    finally{ g.dispose(); }
                }while(strategy.contentsRestored()); // idealmente este bucle solo se hara una vez, pero podria ser que entre medias perdiesemos el buffer (el. ALt+Tab), por lo que habria que repintarlo

                strategy.show(); // mostramos el buffer de dibujado
            }while(strategy.contentsLost());

            try{ Thread.sleep(1); }
            catch(Exception e){}
        }// while
    }// main
}