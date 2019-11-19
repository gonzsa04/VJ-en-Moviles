package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;

public class Text extends GameObject {
    private ArrayList<Sprite> sprites_;  // sprites a traves de los cuales se escribira el texto
    private String text_;                // texto a escribir
    private float separation_;           // separacion entre caracteres del texto

    public Text(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        // todos los sprites compartiran la misma spritesheet, solo cambiara el frame que utilicen de ella
        sprite_ = loadSprite("Sprites/scoreFont.png", 7, 15, 0, 255);
        sprites_ = new ArrayList<Sprite>();

        separation_ = sprite_.getWidth()/2;

        setText(tag_);
    }

    public void render(){
        for(int i = 0; i< sprites_.size();i++){ // el caracter inicial se pintara en la posicion del texto
                                                // los demas se pintaran hacia la izquierda
            sprites_.get(i).draw(position_.x - i*separation_, position_.y);
        }
    }

    public void update(double deltaTime){}

    public boolean handleEvent(InputInterface.TouchEvent event){
        return false;
    }

    public void reset(){}

    /**
     * Parsea el texto a escribir (string) a los sprites con los que representarlo
     */
    private void textToSprite(){
        sprites_.clear();

        for(int i = text_.length() - 1; i >= 0; i--) {
            char ch = text_.charAt(i);
            ch = Character.toUpperCase(ch);
            Sprite auxSprite = new Sprite(game_.getGraphics(), scale_,
                    7, 15, 0, 255);

            auxSprite.setImage(sprite_.getImage()); // todos utilizan la misma imagen (spritesheet)

            switch (ch) {
                // NUMEROS
                case '0':
                    auxSprite.setFrame(52);
                    break;
                case '1':
                    auxSprite.setFrame(53);
                    break;
                case '2':
                    auxSprite.setFrame(54);
                    break;
                case '3':
                    auxSprite.setFrame(55);
                    break;
                case '4':
                    auxSprite.setFrame(56);
                    break;
                case '5':
                    auxSprite.setFrame(57);
                    break;
                case '6':
                    auxSprite.setFrame(58);
                    break;
                case '7':
                    auxSprite.setFrame(59);
                    break;
                case '8':
                    auxSprite.setFrame(60);
                    break;
                case '9':
                    auxSprite.setFrame(61);
                    break;

                // LETRAS
                default:
                    auxSprite.setFrame(ch - 'A');
                    break;
            }
            sprites_.add(auxSprite);
        }
    }

    public void setText(String text){
        text_ = text;
        textToSprite();
    }

    /** Devuelve el ancho del texto entero -> numero de sprites * ancho de cada sprite*/
    public float getWidth(){
        return (scale_.x*(sprite_.getWidth()/2)) * (sprites_.size() - 1);
    }
}
