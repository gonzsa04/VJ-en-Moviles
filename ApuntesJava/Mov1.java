import javax.swing.JFrame;                              // clase para crear ventanas
import javax.swing.JButton;
import java.awt.event.*;                                // importa todo de este paquete de eventos

//podemos crear varias clases en el mismo fichero, solo tiene que haber una publica con el nombre del fichero. Sale un .class por cada clase que haya

public class Mov1 extends JFrame {


    //-------------------------------------------------------------------CLASES ANIDADAS-------------------------------------------------------------------

    // al estar aqui dentro se accedera a ella como Mov.MiActionListener. Asi se solucionan posibles colisiones de nombres (no se pueden declarar clases con $ en su nombre)
    // ser una clase anidada en otra no es lo mismo que heredar de ella

    // una clase anidada ESTATICA solo puede acceder a los atributos y metodos estaticos de la clase en la que esta contenida, como MENSAJE, 
    // sin necesidad de cualificar el nombre (no hay que poner Mov::MENSAJE). Puede crearse desde fuera de la clase en la que esta contenida

    // a una clase anidada NO ESTATICA, se le pasa como parametro una instancia de la clase en la que esta contenida, por lo que podra acceder a variables estaticas, privadas, etc.
    // de esta forma, solo puede crearse en el contexto (no static) de la clase en la que esta contenida

    // si se declara dentro de una clase pero fuera de sus metodos, funciona como ATRIBUTO de esa clase. Si la declaramos dentro de uno de sus metodos, funcionara como CLASE 
    // LOCAL de ese metodo (ver Mov2.java)
    
    // clase anidada no estatica, que funciona como atributo de la clase Mov1
    class MiActionListener implements ActionListener{
        public void actionPerformed(ActionEvent e){      // llamado al ser clickado
            System.out.println(MENSAJE + " Pulsado sobre ventana " + _titulo);
        }
    }
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------


    public Mov1(String name){                           // LOS CONSTRUCTORES NO SE HEREDAN
        super(name);                                    // constructor del padre. Java no te deja hacer nada antes. Por defecto constructor vacio (si no tiene, petara)
        _titulo = name;
    }

    public void init(){

        setSize(400,400);                               // poner this es de guiris
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // cuando cierre la ventana, cierra la app 
                                                        // (mata la hebra para que no siga preguntando por input de user)

        JButton boton = new JButton("Pulsame");         // por defecto se autoajusta por Java
        add(boton);
        
        boton.addActionListener(new MiActionListener());

    }

    private static final String MENSAJE = "AY";
    private String _titulo;

    public static void main(String[] args){

        Mov1 ventana = new Mov1("Hola mundo");
        ventana.init();

        ventana.setVisible(true);

        System.out.println("Ventana creada!");
        System.out.println("Nada mas que hacer");
    }
}