using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager instance;
    public BoardManager boardManager_;

    private int level_ = 1;

    private void Awake()
    {
        instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        boardManager_.LoadLevel(level_);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void ToNextLevel()
    {
        level_++;
        boardManager_.LoadLevel(level_);
    }

    public void ShowHints()
    {
        boardManager_.ShowHint();
    }
}
