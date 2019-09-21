import javax.swing.JFrame;                              // clase para crear ventanas
import javax.swing.JButton;
import java.awt.event.*;                                // importa todo de este paquete de eventos

//podemos crear varias clases en el mismo fichero, solo tiene que haber una publica con el nombre del fichero. Sale un .class por cada clase que haya

public class Mov2 extends JFrame {

    public Mov2(String name){                           // LOS CONSTRUCTORES NO SE HEREDAN
        super(name);                                    // constructor del padre. Java no te deja poner hacer antes. Por defecto constructor vacio (si no tiene petara)
        _titulo = name;
    }

    protected void ponBoton(String etiqueta, String mensaje){

        // funciona como variable (clase) local de ponBoton()
        class MiActionListener implements ActionListener{
            public void actionPerformed(ActionEvent e){      // llamado al ser clickado
                System.out.println(MENSAJE + " Pulsado sobre ventana " + _titulo + " mensaje: " + mensaje);
                // recibe implicitamente los parametros del metodo en el que esta declarado (ponBoton), que seran guardados en atributos "invisibles de la clase",
                // para poder ser usados posteriormente (etiqueta, mensaje). No accede a ellos a traves de un this de la clase donde esta contenida, como pasaba en Mov1.java
                // sigue teniendo los parametros estaticos y privados de la clase en la que esta contenida (MENSAJE, _titulo)
            }
        }

        JButton boton = new JButton(etiqueta);
        add(boton);
        
        boton.addActionListener(new MiActionListener()); // cuando se llama al new de una clase local es cuando se pasa al constructor el this y los parametros de este metodo
    }

    public void init(){

        setSize(400,400);                               // poner this es de guiris
        setLayout(new java.awt.GridLayout(3,1));        // una columna de tres filas
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // cuando cierre la ventana, cierra la app 
                                                        // (mata la hebra para que no siga preguntando por input de user)

        ponBoton("1", "hola1");
        ponBoton("2", "hola2");
        ponBoton("3", "hola3");
    }

    private static final String MENSAJE = "AY";
    private String _titulo;

    public static void main(String[] args){

        Mov2 ventana = new Mov2("Hola mundo");
        ventana.init();

        ventana.setVisible(true);

        System.out.println("Ventana creada!");
        System.out.println("Nada mas que hacer");
    }
}