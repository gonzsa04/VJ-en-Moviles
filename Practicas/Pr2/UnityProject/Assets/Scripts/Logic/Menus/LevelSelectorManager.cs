using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class LevelSelectorManager : MonoBehaviour
{
    public static LevelSelectorManager instance;
    public RectTransform targetTrans;
    public RectTransform buttonPanelTrans;
    public GameObject buttonPrefab;
    public Image currentDifficultySprite;
    public Sprite[] difficultySprites;

    private int difficultyLevel_;
    private int numLevels_;
    private static LoadManager loadManager_;

    void Awake()
    {
        instance = this;
        loadManager_ = LoadManager.instance;
        difficultyLevel_ = loadManager_.difficultyLevel;
        numLevels_ = loadManager_.difficultiesInfo[difficultyLevel_].numLevels;

        currentDifficultySprite.sprite = difficultySprites[difficultyLevel_];

        InitButtons();
        buttonPanelTrans.localScale = new Vector2(1, 1);
        FitPosition();
    }

    public void GoToMenu()
    {
        SceneManager.LoadScene("MenuScene");
    }

    public void GoToLevel(int level)
    {
        int numLevelInTotal = 0;
        for (int i = 0; i < difficultyLevel_; i++)
            numLevelInTotal += loadManager_.difficultiesInfo[i].numLevels;

        loadManager_.difficultiesInfo[difficultyLevel_].currentLevel = level;
        loadManager_.numLevel = numLevelInTotal + level;
        SceneManager.LoadScene("GameScene");
    }

    /// <summary>
    /// Ajusta la posicion del tablero para que este salga centrado en pantalla
    /// </summary>
    public void FitPosition()
    {
        Vector3[] corners = new Vector3[4];
        targetTrans.GetWorldCorners(corners);
        float yTargetCorner = corners[1].y;
        buttonPanelTrans.GetWorldCorners(corners);
        float yCorner = corners[1].y;

        buttonPanelTrans.transform.position = new Vector2(buttonPanelTrans.transform.position.x,
            buttonPanelTrans.transform.position.y - (yCorner - yTargetCorner));
    }

    public void InitButtons()
    {
        for (int i = 0; i < numLevels_; i++)
        {
            GameObject newButton = Instantiate(buttonPrefab, buttonPanelTrans);
            newButton.GetComponent<LevelButton>().SetLevel(i + 1);
        }
    }
}
