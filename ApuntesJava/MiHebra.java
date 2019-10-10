// Thread esta en lang, no hay que hacer import
// Heredar de Thread no esta bien visto -> implementaremos la interfaz Runnable (algo que se puede ejecutar)
public class MiHebra implements Runnable{

    public MiHebra(int id_){
        id = id_;
    }
    public void run(){
        int i = 0;
        while(true){
            System.out.println("Desde la hebra " + id + ": " + i++); // aqui las hebras se esperan para no pisarse unas con otras (se contienen)
        }
    }
    protected int id;

    public static void main(String[] args){
        // MiHebra hebra = new MiHebra(); // cuando MiHebra heredaba de Thread
        // hebra.start(); // lo hereda de Thread, y lanza la hebra

        Thread hebra = new Thread(new MiHebra(1)); // constructor de la clase Thread que recibe un Runneable
        hebra.start(); // ejecutara el run del objeto recibido en la constructora

        new Thread(new MiHebra(2)).start(); // creamos otra hebra, ejecutadas sobre dos objetos distintos

        int i = 0;
        while(true){
            System.out.println("Desde el main: " + i++);
        }
    }
}