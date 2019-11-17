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
    }

    public void init(){
        super.init();
        sprites_ = new ArrayList<Sprite>();
        setText(tag_);
    }

    public void render(){
        for(int i = 0; i< sprites_.size();i++){
            sprites_.get(i).draw(position_.x - i*sprites_.get(i).getWidth()/2, position_.y);
        }
    }

    public void update(double deltaTime){}

    public boolean handleEvent(InputInterface.TouchEvent event){
        return false;
    }

    private void textToSprite(){
        sprites_.clear();
        for(int i = text_.length() - 1; i >= 0; i--) {
            char ch = text_.charAt(i);
            ch = Character.toUpperCase(ch);
            sprite_ = new Sprite(game_.getGraphics(), "Sprites/scoreFont.png", scale_,
                    7, 15, 0, 255);

            switch (ch) {
                case 'A':
                    sprite_.setFrame(0);
                    break;
                case 'B':
                    sprite_.setFrame(1);
                    break;
                case 'C':
                    sprite_.setFrame(2);
                    break;
                case 'D':
                    sprite_.setFrame(3);
                    break;
                case 'E':
                    sprite_.setFrame(4);
                    break;
                case 'F':
                    sprite_.setFrame(5);
                    break;
                case 'G':
                    sprite_.setFrame(6);
                    break;
                case 'H':
                    sprite_.setFrame(7);
                    break;
                case 'I':
                    sprite_.setFrame(8);
                    break;
                case 'J':
                    sprite_.setFrame(9);
                    break;
                case 'K':
                    sprite_.setFrame(10);
                    break;
                case 'L':
                    sprite_.setFrame(11);
                    break;
                case 'M':
                    sprite_.setFrame(12);
                    break;
                case 'N':
                    sprite_.setFrame(13);
                    break;
                case 'O':
                    sprite_.setFrame(14);
                    break;
                case 'P':
                    sprite_.setFrame(15);
                    break;
                case 'Q':
                    sprite_.setFrame(16);
                    break;
                case 'R':
                    sprite_.setFrame(17);
                    break;
                case 'S':
                    sprite_.setFrame(18);
                    break;
                case 'T':
                    sprite_.setFrame(19);
                    break;
                case 'U':
                    sprite_.setFrame(20);
                    break;
                case 'V':
                    sprite_.setFrame(21);
                    break;
                case 'W':
                    sprite_.setFrame(22);
                    break;
                case 'X':
                    sprite_.setFrame(23);
                    break;
                case 'Y':
                    sprite_.setFrame(24);
                    break;
                case 'Z':
                    sprite_.setFrame(25);
                    break;

                case '0':
                    sprite_.setFrame(52);
                    break;
                case '1':
                    sprite_.setFrame(53);
                    break;
                case '2':
                    sprite_.setFrame(54);
                    break;
                case '3':
                    sprite_.setFrame(55);
                    break;
                case '4':
                    sprite_.setFrame(56);
                    break;
                case '5':
                    sprite_.setFrame(57);
                    break;
                case '6':
                    sprite_.setFrame(58);
                    break;
                case '7':
                    sprite_.setFrame(59);
                    break;
                case '8':
                    sprite_.setFrame(60);
                    break;
                case '9':
                    sprite_.setFrame(61);
                    break;
            }
            sprites_.add(sprite_);
        }
    }

    public void setText(String text){
        text_ = text;
        textToSprite();
    }


    public float getWidth(){
        float kk = (scale_.x*(sprite_.getWidth()/2)) * (sprites_.size() - 1);
        return (scale_.x*(sprite_.getWidth()/2)) * (sprites_.size() - 1);
    }
}
