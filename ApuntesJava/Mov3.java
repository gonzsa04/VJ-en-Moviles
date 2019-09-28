import javax.swing.JFrame;                              // clase para crear ventanas
import javax.swing.JButton;
import java.awt.event.*;                                // importa todo de este paquete de eventos

//podemos crear varias clases en el mismo fichero, solo tiene que haber una publica con el nombre del fichero. Sale un .class por cada clase que haya

public class Mov3 extends JFrame {

    public Mov3(String name){                           // LOS CONSTRUCTORES NO SE HEREDAN
        super(name);                                    // constructor del padre. Java no te deja poner hacer antes. Por defecto constructor vacio (si no tiene petara)
        _titulo = name;
    }

    protected void ponBoton(String etiqueta, String mensaje){

        // funciona como variable (clase) local de ponBoton()
        

        JButton boton = new JButton(etiqueta);
        add(boton);
        
        boton.addActionListener(new ActionListener() {  // clase anonima -> le pasamos la interfaz de ActionListener como clase. Crea una instancia de ella y la pasa como parametro
            public void actionPerformed(ActionEvent e){ // tiene un unico metodo
               onClick(); // aqui se programa poco, se podran llamar a metodos y atributos privados y estaticos de la clase en la que esta contenida (igual que antes)
            }
        }); 
    }

    private void onClick(){ 
        System.out.println(MENSAJE + " Pulsado sobre ventana " + _titulo);
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

        Mov3 ventana = new Mov3("Hola mundo");
        ventana.init();

        ventana.setVisible(true);

        System.out.println("Ventana creada!");
        System.out.println("Nada mas que hacer");
    }
}