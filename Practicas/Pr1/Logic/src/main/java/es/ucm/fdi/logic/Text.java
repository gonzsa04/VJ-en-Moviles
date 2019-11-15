package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;

public class Text extends GameObject {
    private ArrayList<Sprite> sprites_;
    private String text_;

    public Text(GameInterface game, String tag){
        super(game, tag);
        init();
    }

    public void init(){
        super.init();
        sprites_ = new ArrayList<Sprite>();
        setText("");
    }

    public void render(){
        for(int i = 0; i< sprites_.size();i++){
            sprites_.get(i).draw(position_.x - i*sprites_.get(i).getWidth()/2, position_.y);
        }
    }

    public void update(double deltaTime){}

    public void handleEvent(InputInterface.TouchEvent event){}

    private void textToSprite(){
        sprites_.clear();
        for(int i = text_.length() - 1; i >= 0; i--) {
            char ch = text_.charAt(i);
            ch = Character.toUpperCase(ch);
            Sprite character = new Sprite(game_.getGraphics(), "Sprites/scoreFont.png", scale_,
                    7, 15, 0, 255);

            switch (ch) {
                case 'A':
                    character.setFrame(0);
                    break;
                case 'B':
                    character.setFrame(1);
                    break;
                case 'C':
                    character.setFrame(2);
                    break;
                case 'D':
                    character.setFrame(3);
                    break;
                case 'E':
                    character.setFrame(4);
                    break;
                case 'F':
                    character.setFrame(5);
                    break;
                case 'G':
                    character.setFrame(6);
                    break;
                case 'H':
                    character.setFrame(7);
                    break;
                case 'I':
                    character.setFrame(8);
                    break;
                case 'J':
                    character.setFrame(9);
                    break;
                case 'K':
                    character.setFrame(10);
                    break;
                case 'L':
                    character.setFrame(11);
                    break;
                case 'M':
                    character.setFrame(12);
                    break;
                case 'N':
                    character.setFrame(13);
                    break;
                case 'O':
                    character.setFrame(14);
                    break;
                case 'P':
                    character.setFrame(15);
                    break;
                case 'Q':
                    character.setFrame(16);
                    break;
                case 'R':
                    character.setFrame(17);
                    break;
                case 'S':
                    character.setFrame(18);
                    break;
                case 'T':
                    character.setFrame(19);
                    break;
                case 'U':
                    character.setFrame(20);
                    break;
                case 'V':
                    character.setFrame(21);
                    break;
                case 'W':
                    character.setFrame(22);
                    break;
                case 'X':
                    character.setFrame(23);
                    break;
                case 'Y':
                    character.setFrame(24);
                    break;
                case 'Z':
                    character.setFrame(25);
                    break;

                case '0':
                    character.setFrame(52);
                    break;
                case '1':
                    character.setFrame(53);
                    break;
                case '2':
                    character.setFrame(54);
                    break;
                case '3':
                    character.setFrame(55);
                    break;
                case '4':
                    character.setFrame(56);
                    break;
                case '5':
                    character.setFrame(57);
                    break;
                case '6':
                    character.setFrame(58);
                    break;
                case '7':
                    character.setFrame(59);
                    break;
                case '8':
                    character.setFrame(60);
                    break;
                case '9':
                    character.setFrame(61);
                    break;
            }
            sprites_.add(character);
        }
    }

    public void setText(String text){
        text_ = text;
        textToSprite();
    }
}
