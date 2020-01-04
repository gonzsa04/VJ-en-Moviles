using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LevelButton : MonoBehaviour
{
    public Text textComponent;
    public Sprite blockedSprite;

    private int level_;

    void Start()
    {
        Button btn = gameObject.GetComponent<Button>(); //or just drag-n-drop the button in the CustomButton field
        btn.onClick.AddListener(Click);  //subscribe to the onClick event

        if (LoadManager.instance.difficultiesInfo[LoadManager.instance.difficultyLevel].numLevelsUnLocked <= level_ - 1)
        {
            btn.enabled = false;
            GetComponent<EnlargeAnimation>().enabled = false;

            gameObject.GetComponent<Image>().sprite = blockedSprite;
            for (int i = 0; i < transform.childCount; i++)
            {
                transform.GetChild(i).gameObject.SetActive(false);
            }
        }
    }

    private void Click()
    {
        LevelSelectorManager.instance.GoToLevel(level_);
    }

    public void SetLevel(int level)
    {
        level_ = level;
        textComponent.text = level_.ToString("000");
    }
}
