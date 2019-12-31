using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour
{
    public Text moneyText;
    public Text medalsText;
    public Text[] difficultyTexts;

    private static LoadManager loadManager_;

    void Awake()
    {
        loadManager_ = LoadManager.instance;
    }

    void Start()
    {
        moneyText.text = loadManager_.money.ToString();
        medalsText.text = loadManager_.medals.ToString();
        for(int i = 0; i < difficultyTexts.Length; i++) {
            difficultyTexts[i].text = string.Format("{0}/{1}", 
                loadManager_.difficultiesInfo[i].numLevelsUnLocked, loadManager_.difficultiesInfo[i].numLevels);
        }
    }

    public void GoToLevelSelector(int difficulty)
    {
        loadManager_.difficultyLevel = difficulty;
        SceneManager.LoadScene("LevelSelectorScene");
    }

    public void GoToChallenge()
    {
        SceneManager.LoadScene("ChallengeScene");
    }

    public void QuitApplication()
    {
        Application.Quit();
    }
}
