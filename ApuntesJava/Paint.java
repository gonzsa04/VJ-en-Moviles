import javax.swing.JFrame;
import java.awt.*;

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
    public void update(long milisDeltaTime){
        x += incrx * milisDeltaTime / 1000.0; // unidades -> pixeles (incrX) por segundo (milis/1000). x no puede ser int -> si tiene que moverse menos de un pixel por segundo, truncara a 0

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

    // pintado de la imagen
    public void render(){
        Graphics g = getGraphics(); // hay que pedirle Graphics a la ventana, modificarlo y luego devolverselo
        try{
            g.setColor(Color.blue); // pintamos el fondo, ya que swing no lo hara por nosotros -> hemos ignorado el pintado en init()
            g.fillRect(0,0,400,400);

            try{
                Thread.sleep(1);    // esto produce que la imagen no se pinte. El fondo y la imagen estan en el mismo frame buffer y se solapan
            }
            catch(Exception e){

            }
            
            if(_logo != null){
                g.drawImage(_logo, (int)x, 10, null);
            }
        }
        // no hay catch(...) porque no hay que declarar TODAS las excepciones -> los errores de programacion como salirnos de un vector, etc. no hay que declararlas
        // solo si peta al cargar cosas, etc., como en init() al cargar la imagen
        finally{                // asi nos asegurmos de que esto se ejecute siempre
            g.dispose();        //libera la variable graphics de ventana, si no habra leaks!!
        }
    }

    // EN ANDROID NO HAY MAIN, habra que lidiar con threads
    public static void main(String[] args){
        Paint ventana = new Paint("nombre");
        ventana.init();
        ventana.setVisible(true);

        long lastFrameTime = System.nanoTime(); // si pusieramos int no cabria mas de unos dos segundos (recordar que es nano -> 9 ceros)

        while(true){ // haremos bucles de renderizado y logica. SEPARAR METODOS DE RENDER Y UPDATE EN OTRA CLASE, no todo dentro de la clase que hereda de JFrame
            long currentTime = System.nanoTime();
            ventana.update((currentTime - lastFrameTime) / 1000000); // resta = deltaTime. Lo pasamos a milisegundos
            lastFrameTime = currentTime;
            ventana.render();

            try{
                Thread.sleep(1);
            }
            catch(Exception e){

            }
        }// while
    }// main
}