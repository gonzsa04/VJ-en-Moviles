using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BoardManager : MonoBehaviour
{
    private List<GameObject> board_;
    private List<bool> boolBoard_;
    private List<int> path_;

    private float tileWidth_, tileHeight_;
    private bool pressed_;

    public int rows = 3, cols = 3;

    public GameObject tilePrefab_;

    // Start is called before the first frame update
    void Start()
    {
        board_ = new List<GameObject>();
        boolBoard_ = new List<bool>();
        path_ = new List<int>();

        tileWidth_ = tilePrefab_.transform.localScale.x;
        tileHeight_ = tilePrefab_.transform.localScale.y;
        pressed_ = false;

        loadTiles();
    }

    private void loadTiles()
    {
        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {

                GameObject newTile = Instantiate(tilePrefab_, transform);

                Vector2 tilePosition = new Vector2(newTile.transform.position.x + j * tileWidth_,
                   newTile.transform.position.y + i * tileHeight_);

                newTile.transform.position = tilePosition;

                board_.Add(newTile);
                boolBoard_.Add(false);
            }
        }
        pressTile(0, true); // inicial
    }

    // Update is called once per frame
    void Update()
    {
        handleInput();
    }

    private void handleInput()
    {
#if !UNITY_EDITOR && (UNITY_ANDROID || UNITY_IOS)
        MobileInput();
#else
        PCInput();
#endif
    }

    private void PCInput()
    {
        if (Input.GetMouseButton(0))
        {
            Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);

            if (isInsideBoard(mousePos))
            {
                float difx = Mathf.Abs(transform.position.x - mousePos.x);
                float dify = Mathf.Abs(transform.position.y - mousePos.y);
                int col = Mathf.RoundToInt(difx / tileWidth_);
                int row = Mathf.RoundToInt(dify / tileHeight_);

                int i = row * cols + col;
                if (!boolBoard_[i] && isAdyacentToPath(i))
                {
                    pressTile(i, true);
                }
                else if (boolBoard_[i])
                {
                    int indexInPath = path_.IndexOf(i);
                    for (int currentCount = path_.Count - 1; indexInPath == -1 || currentCount > indexInPath; currentCount--)
                    {
                        pressTile(path_[currentCount], false);
                    }
                }
            }
        }

        else if (Input.GetMouseButtonUp(0))
        {
            // mirar si ha ganado
        }
    }

    private void MobileInput()
    {

    }

    private void pressTile(int boardIndex, bool pressed)
    {
        Tile tileComponent = board_[boardIndex].GetComponent<Tile>();
        boolBoard_[boardIndex] = pressed;
        tileComponent.setPressed(pressed);
        if (pressed)
            path_.Add(boardIndex);
        else path_.Remove(boardIndex);

    }

    private bool isInsideBoard(Vector2 pos)
    {
        return (pos.x >= transform.position.x - tileWidth_ / 2 && pos.x < transform.position.x + cols * tileWidth_ - tileWidth_ / 2
                && pos.y >= transform.position.y - tileHeight_ / 2 && pos.y < transform.position.y + cols * tileHeight_ - tileHeight_ / 2);
    }

    private bool isAdyacentToPath(int index)
    {
        return (index + 1 == path_[path_.Count - 1] || index - 1 == path_[path_.Count - 1] ||  // izq-der
            index + cols == path_[path_.Count - 1] || index - cols == path_[path_.Count - 1]); // arriba-abajo
    }
}
