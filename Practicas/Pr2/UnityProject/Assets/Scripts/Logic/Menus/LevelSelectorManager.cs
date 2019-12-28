using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelSelectorManager : MonoBehaviour
{
    public int rows = 20;
    public int cols = 5;

    public RectTransform parent;
    public Canvas canvas;

    public GameObject buttonPrefab;

    private float buttonWidth_;
    private float buttonHeight_;
    private float factor_;
    private const float baseWidth_ = 5.62f;    // ancho jugable estandar (1080:1920)
    private const float baseHeight_ = 6.21f;   // alto jugable estandar (1080:1920)

    // Start is called before the first frame update
    void Start()
    {
        SetFactor();
        InitButtons();
        FitScaleToAspectRatio();
        FitPosition();
    }

    public void GoToMenu() {
        SceneManager.LoadScene("MenuScene");
    }

    public void GoToLevel(int level)
    {
        SceneManager.LoadScene("GameManagerScene");
    }
    
    /// <summary>
    /// Establece el factor de escala que usara el tablero para ocupar el mayor hueco posible dentro del area de juego,
    /// usando como referencia el area estandar para la que esta preparada su escala por defecto
    /// </summary>
    private void SetFactor()
    {
        float height = Camera.main.orthographicSize * 2;
        float width = Camera.main.aspect * height;

        float xFactor_ = (float)width / (float)baseWidth_;
        float yFactor_ = (float)height / (float)baseHeight_;

        if (yFactor_ < xFactor_)
            factor_ = yFactor_;
        else
            factor_ = xFactor_;
    }

    /// <summary>
    /// Ajusta la escala del tablero (y todos sus hijos / llamar despues de loadLevel()) al aspect ratio y al tamaño de la ventana
    /// </summary>
    private void FitScaleToAspectRatio()
    {
        Vector2 aux = parent.localScale * factor_;
        buttonWidth_ = aux.x;
        buttonHeight_ = aux.y;
        parent.localScale = aux;
    }

    /// <summary>
    /// Ajusta la posicion del tablero para que este salga centrado en pantalla
    /// </summary>
    public void FitPosition()
    {
        Vector3 aux = new Vector3(0, 0, 0);

        aux.x = 0;
        aux.y = -rows * buttonHeight_ / 2 + buttonHeight_ / 2;
        parent.position = aux;
    }

    public void InitButtons()
    {

        buttonWidth_ = parent.localScale.x;
        buttonHeight_ = parent.localScale.y;

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                GameObject newButton = Instantiate(buttonPrefab, parent);
                
                float rowWidth = buttonWidth_ * cols;
                float rowHeight = buttonHeight_ * rows;

                Vector2 tilePosition = new Vector2(parent.position.x - (rowWidth/2) + (buttonWidth_/2) + (buttonWidth_*j),
                   parent.position.y - (rowHeight/2) + (buttonHeight_/2) + (buttonHeight_ * i));

                newButton.transform.position = tilePosition;
                newButton.transform.localScale /= factor_;
            }
        }
    }
    }
