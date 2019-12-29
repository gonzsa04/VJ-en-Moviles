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

        hintText.text = hintCost.ToString();
        boardManager.LoadLevel(level_);

        Advertisement.Initialize("OneLine");
    }

    public void ToNextLevel()
    {
        level_++;
        boardManager.LoadLevel(level_);
        SceneComunicator.instance.numLevel = level_;
        int lastLevel = SceneComunicator.instance.difficultyLevel *
            SceneComunicator.instance.numLevels[SceneComunicator.instance.difficultyLevel];
        if (level_ > lastLevel)
            SceneComunicator.instance.difficultyLevel++;
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
