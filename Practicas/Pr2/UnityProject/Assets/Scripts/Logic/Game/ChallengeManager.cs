﻿using System.Collections;
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
    
    private int level_;
    Timer timerComponent_;

    private void Awake()
    {
        instance = this;
    }

    void Start()
    {
        level_ = Random.Range(1, LoadManager.instance.totalNumLevels + 1);
        timerComponent_ = gameObject.GetComponent<Timer>();
        
        boardManager.LoadLevel(level_);

        Advertisement.Initialize("OneLine");
    }

    void Update()
    {
        if (timerComponent_.IsTimerFinished())
            GameOver();
        else if (boardManager.LevelCompleted() && !boardManager.isButtonDown)
            Win();
    }

    private void BackToMenu()
    {
       SceneManager.LoadScene("MenuScene");
    }

    private void Win()
    {
        //canvas
        LoadManager.instance.money += moneyIncrement;
        LoadManager.instance.medals++;
        LoadManager.instance.Save();
        BackToMenu();
    }

    private void GameOver()
    {
        //canvas
        BackToMenu();
    }
}
