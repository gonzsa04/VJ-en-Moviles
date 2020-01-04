using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

/// <summary>
/// Componente del Manager de la escena de LevelSelector. Gestiona el scroll de los botones de
/// dicha escena
/// </summary>
public class LevelSelectorManager : MonoBehaviour
{
    public static LevelSelectorManager instance;

    [Tooltip("Transform del objeto encargado de hacer el scroll")]
    public RectTransform scrollTrans;
    [Tooltip("Transform del panel que albergara a todos los botones")]
    public RectTransform buttonPanelTrans;
    [Tooltip("Prefab de boton a instanciar en el panel de botones")]
    public GameObject buttonPrefab;
    [Tooltip("Imagen que contendra el Sprite que indique el nivel de dificultad actual")]
    public Image currentDifficultySprite;
    [Tooltip("Sprites que indican todos los posibles niveles de dificultad")]
    public Sprite[] difficultySprites;

    private int difficultyLevel_; // dificultad actual
    private int numLevels_;       // numero de niveles de la dificultad actual
    private static DataManager DataManager_;

    // lee el nivel de dificultad actual, cuantos niveles tiene y actualiza la imagen
    // inicializa los botonesy los posiciona
    void Awake()
    {
        instance = this;
        DataManager_ = DataManager.instance;
        difficultyLevel_ = DataManager_.difficultyLevel;
        numLevels_ = DataManager_.difficultiesInfo[difficultyLevel_].numLevels;

        currentDifficultySprite.sprite = difficultySprites[difficultyLevel_];

        InitButtons();
        buttonPanelTrans.localScale = new Vector2(1, 1);
        FitPosition();
    }

    public void GoToMenu()
    {
        SceneManager.LoadScene("MenuScene");
    }

    /// <summary>
    /// Lleva a la escena de juego con un nivel de 1 a numNiveles en total
    /// </summary>
    /// <param name="level">nivel al que se quiere jugar</param>
    public void GoToLevel(int level)
    {
        int numLevelInTotal = 0;
        for (int i = 0; i < difficultyLevel_; i++)
            numLevelInTotal += DataManager_.difficultiesInfo[i].numLevels;

        DataManager_.difficultiesInfo[difficultyLevel_].currentLevel = level;
        DataManager_.numLevel = numLevelInTotal + level;
        SceneManager.LoadScene("GameScene");
    }
    
    // Ajusta la posicion del panel de botones para que este salga centrado en pantalla
    private void FitPosition()
    {
        Vector3[] corners = new Vector3[4];
        scrollTrans.GetWorldCorners(corners);
        float yTargetCorner = corners[1].y;
        buttonPanelTrans.GetWorldCorners(corners);
        float yCorner = corners[1].y;

        buttonPanelTrans.transform.position = new Vector2(buttonPanelTrans.transform.position.x,
            buttonPanelTrans.transform.position.y - (yCorner - yTargetCorner));
    }

    // Instancia los botones como hijos del panel de botones y les establece a cada uno el nivel que representan
    private void InitButtons()
    {
        for (int i = 0; i < numLevels_; i++)
        {
            GameObject newButton = Instantiate(buttonPrefab, buttonPanelTrans);
            newButton.GetComponent<LevelButton>().SetLevel(i + 1);
        }
    }
}
