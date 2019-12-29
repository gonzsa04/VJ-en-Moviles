using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour
{
    public int[] numLevelsPerDifficulty;
    public Text moneyText;

    void Awake()
    {
        SceneComunicator.instance.numLevels = numLevelsPerDifficulty;
    }

    void Start()
    {
        moneyText.text = SceneComunicator.instance.money.ToString();
    }

    public void GoToLevelSelector(int difficulty)
    {
        SceneComunicator.instance.difficultyLevel = difficulty;
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
