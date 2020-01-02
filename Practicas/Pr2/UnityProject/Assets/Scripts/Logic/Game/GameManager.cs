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
    public RewardedAds rewardedComp;

    private static LoadManager loadManager_;
    private int money_;
    private int level_;

    private void Awake()
    {
        instance = this;
        loadManager_ = LoadManager.instance;
    }
    
    void Start()
    {
        rewardedComp.SetRewardMethod(Reward);
        money_ = loadManager_.money;
        moneyText.text = money_.ToString();

        level_ = loadManager_.numLevel;

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
        currentDifficultySprite.sprite = difficultySprites[loadManager_.difficultyLevel];
        currentDifficultyText.text = (loadManager_.difficultiesInfo[loadManager_.difficultyLevel].currentLevel).ToString();
    }

    public void ToNextLevel()
    {
        level_++;
        boardManager.LoadLevel(level_);
        loadManager_.numLevel = level_;
        if (loadManager_.difficultiesInfo[loadManager_.difficultyLevel].currentLevel ==
            loadManager_.difficultiesInfo[loadManager_.difficultyLevel].numLevelsUnLocked)
        {
            loadManager_.difficultiesInfo[loadManager_.difficultyLevel].numLevelsUnLocked++;
        }

        loadManager_.difficultiesInfo[loadManager_.difficultyLevel].currentLevel++;

        int lastLevel = 0;
        for (int i = 0; i < loadManager_.difficultyLevel + 1; i++)
            lastLevel += loadManager_.difficultiesInfo[i].numLevels;


        if (level_ > lastLevel)
        {
            loadManager_.difficultyLevel++;
            loadManager_.difficultiesInfo[loadManager_.difficultyLevel].currentLevel = 1;
        }

        SetLevelName();
    }

    public void ShowHints()
    {
        if (money_ >= hintCost && !boardManager.AllHintsGiven())
        {
            money_ -= hintCost;
            loadManager_.money = money_;
            moneyText.text = money_.ToString();
            StartCoroutine(boardManager.ShowHint());
        }
    }

    private void Reward()
    {
        money_ += moneyIncrement;
        loadManager_.money = money_;
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
