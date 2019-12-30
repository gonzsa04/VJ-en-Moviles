using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public static GameManager instance;
    public BoardManager boardManager;
    public Text moneyText;
    public Text hintText;
    public int moneyIncrement = 20;
    public int hintCost = 25;
    public Image currentDifficultySprite;
    public Text currentDifficultyText;
    public Sprite[] difficultySprites;

    private int money_;
    private int level_;

    private void Awake()
    {
        instance = this;
    }
    
    void Start()
    {
        money_ = SceneComunicator.instance.money;
        level_ = SceneComunicator.instance.numLevel;

        SetLevelName();

        hintText.text = hintCost.ToString();
        boardManager.LoadLevel(level_);

        Advertisement.Initialize("OneLine");
    }

    void Update()
    {
        if (boardManager.LevelCompleted() && !boardManager.isButtonDown)
            ToNextLevel();
    }

    private void SetLevelName()
    {
        currentDifficultySprite.sprite = difficultySprites[SceneComunicator.instance.difficultyLevel];
        currentDifficultyText.text = (SceneComunicator.instance.numLevelInCurrentDifficulty).ToString();
    }

    public void ToNextLevel()
    {
        level_++;
        boardManager.LoadLevel(level_);
        SceneComunicator.instance.numLevel = level_;
        SceneComunicator.instance.numLevelInCurrentDifficulty++;
        SceneComunicator.instance.numLevelsUnLocked[SceneComunicator.instance.difficultyLevel]++;

        int lastLevel = 0;
        for (int i = 0; i < SceneComunicator.instance.difficultyLevel; i++)
            lastLevel += SceneComunicator.instance.numLevels[i];

        if (level_ > lastLevel)
        {
            SceneComunicator.instance.difficultyLevel++;
            SceneComunicator.instance.numLevelInCurrentDifficulty = 1;
        }

        SetLevelName();
    }

    public void ShowHints()
    {
        if (money_ >= hintCost && !boardManager.AllHintsGiven())
        {
            money_ -= hintCost;
            SceneComunicator.instance.money = money_;
            moneyText.text = money_.ToString();
            StartCoroutine(boardManager.ShowHint());
        }
    }

    public void Reward()
    {
        money_ += moneyIncrement;
        SceneComunicator.instance.money = money_;
        moneyText.text = money_.ToString();
    }

    public void RestartLevel()
    {
        boardManager.RestartFrom(0);
    }

    public void BackToLevelSelector()
    {
        SceneManager.LoadScene("LevelSelectorScene");
    }
}
