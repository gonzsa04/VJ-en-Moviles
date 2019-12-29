using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LevelButton : MonoBehaviour
{
    public Text textComponent;

    private int level_;

    void Start()
    {
        Button btn = gameObject.GetComponent<Button>(); //or just drag-n-drop the button in the CustomButton field
        btn.onClick.AddListener(Click);  //subscribe to the onClick event
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
