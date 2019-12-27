using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;

public class GameManager : MonoBehaviour
{
    public static GameManager instance;
    public BoardManager boardManager;
    public Text moneyText;
    public Text hintText;
    public int moneyIncrement = 20;
    public int hintCost = 25;

    private int money_ = 0;
    private int level_ = 25;

    private void Awake()
    {
        instance = this;
    }
    
    void Start()
    {
        hintText.text = hintCost.ToString();
        boardManager.LoadLevel(level_);

        Advertisement.Initialize("OneLine");
    }

    public void ToNextLevel()
    {
        level_++;
        boardManager.LoadLevel(level_);
    }

    public void ShowHints()
    {
        if (money_ >= hintCost)
        {
            money_ -= hintCost;
            moneyText.text = money_.ToString();
            StartCoroutine(boardManager.ShowHint());
        }
    }

    public void Reward()
    {
        money_ += moneyIncrement;
        moneyText.text = money_.ToString();
    }

    public void RestartLevel()
    {
        boardManager.Restart();
    }
}
