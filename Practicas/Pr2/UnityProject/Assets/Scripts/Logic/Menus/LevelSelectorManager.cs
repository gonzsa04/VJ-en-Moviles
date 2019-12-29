﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class LevelSelectorManager : MonoBehaviour
{
    public int rows = 20;
    public int cols = 5;

    public static LevelSelectorManager instance;
    public RectTransform targetTrans;
    public RectTransform buttonPanelTrans;
    public Canvas canvas;
    public GameObject buttonPrefab;
    public Image currentDifficultySprite;
    public Sprite[] difficultySprites;

    private int difficultyLevel_;
    private int numLevels_;

    private void Awake()
    {
        instance = this;
    }

    void Start()
    {
        difficultyLevel_ = SceneComunicator.instance.difficultyLevel;
        numLevels_ = SceneComunicator.instance.numLevels[difficultyLevel_];

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
        SceneComunicator.instance.numLevel = difficultyLevel_ * numLevels_ + level;
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
        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                GameObject newButton = Instantiate(buttonPrefab, buttonPanelTrans);
                newButton.GetComponent<LevelButton>().SetLevel((i * cols + j) + 1);
            }
        }
    }
}