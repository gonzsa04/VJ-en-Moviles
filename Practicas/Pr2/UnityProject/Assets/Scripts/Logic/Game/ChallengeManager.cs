using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

public class ChallengeManager : MonoBehaviour
{
    public static ChallengeManager instance;
    public BoardManager boardManager;
    public int moneyIncrement = 50;
    public GameObject winCanvas;
    public GameObject loseCanvas;
    public RewardedAds rewardedAdsComp;
    
    private int level_;
    private bool won_;
    Timer timerComponent_;

    private void Awake()
    {
        instance = this;
        timerComponent_ = gameObject.GetComponent<Timer>();
        timerComponent_.SetMethod(GameOver);
        rewardedAdsComp.SetRewardMethod(DuplicateMoney);
    }

    void Start()
    {
        level_ = Random.Range(1, LoadManager.instance.totalNumLevels + 1);
        won_ = false;
        winCanvas.SetActive(false);
        loseCanvas.SetActive(false);
        
        boardManager.LoadLevel(level_);

        Advertisement.Initialize("OneLine");
    }

    void Update()
    {
        if (!won_ && boardManager.LevelCompleted() && !boardManager.isButtonDown)
        {
            won_ = true;
            Win();
        }
    }

    public void BackToMenu()
    {
       LoadManager.instance.fromChallenge = true;
       SceneManager.LoadScene("MenuScene");
    }

    public void DuplicateMoney()
    {
        LoadManager.instance.money += moneyIncrement;
        BackToMenu();
    }

    private void Win()
    {
        boardManager.onFocus_ = false;
        winCanvas.SetActive(true);
        timerComponent_.SetPaused(true);
        LoadManager.instance.money += moneyIncrement;
        LoadManager.instance.medals++;
    }

    private void GameOver()
    {
        boardManager.onFocus_ = false;
        loseCanvas.SetActive(true);
    }
}
