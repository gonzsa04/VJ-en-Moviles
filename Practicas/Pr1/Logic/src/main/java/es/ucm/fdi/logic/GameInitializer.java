package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.StateInterface;

/**
 * Estado que inicializa todos los demas estados
 * Se creara el primero, cargara todos los estados,
 * y le dira a Engine que empiece a ejecutar el primero de ellos
 */
public class GameInitializer implements StateInterface {
    private GameInterface game_;

    // estados a inicializar
    private MenuState menuState_;
    private GameState gameState_;
    private GameOverState gameOverState_;
    private InstructionsState instructionsState_;

    private Background backGround_; // mismo fondo compartido entre todos los estados

    public GameInitializer(GameInterface game){
        game_ = game;
    }

    /**Carga el fondo (compartido) y todos los estados, estableciendo sus parametros
     * Y le dice a game que empiece a ejecutar el menu
     * */
    private void load(){
        backGround_ = new Background(game_, "arrows");
        backGround_.init();

        initStates();
        setStatesParams();

        game_.setState(menuState_);
    }

    private void initStates(){
        menuState_ = new MenuState(game_, backGround_);
        menuState_.init();

        gameState_ = new GameState(game_, backGround_);
        gameState_.init();

        gameOverState_ = new GameOverState(game_, backGround_);
        gameOverState_.init();

        instructionsState_ = new InstructionsState(game_, backGround_);
        instructionsState_.init();
    }

    private void setStatesParams(){
        menuState_.setGameState(gameState_);
        menuState_.setInstructionsState(instructionsState_);

        gameState_.setGameOverState(gameOverState_);

        gameOverState_.setGameState(gameState_);
        gameOverState_.setInstructionsState(instructionsState_);

        instructionsState_.setGameState(gameState_);
    }

    public void update(double deltaTime) {
        load();
    }

    public void render() {}
    public void handleInput() {}
    public void reset() {}
    public void init() {}
}
