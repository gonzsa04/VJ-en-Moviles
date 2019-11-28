using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BoardManager : MonoBehaviour
{
    private List<GameObject> board_;
    private float tileWidth_, tileHeight_;
    private bool pressed_;

    public int rows = 3, cols = 3;

    public GameObject tilePrefab_;

    // Start is called before the first frame update
    void Start()
    {
        board_ = new List<GameObject>();
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
                Vector2 tilePosition = new Vector2(transform.position.x + j * tileWidth_,
                    transform.position.y - i *tileHeight_);

                GameObject newTile = Instantiate(tilePrefab_);
                newTile.transform.position = tilePosition;

                board_.Add(newTile);
            }
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            pressed_ = true;
        }
        else if (Input.GetMouseButtonUp(0))
        {
            pressed_ = false;
        }

        if(pressed_)
        {
            Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            float difx = Mathf.Abs(transform.position.x - mousePos.x);
            float dify = Mathf.Abs(transform.position.y - mousePos.y);
            int row = Mathf.RoundToInt(difx / tileWidth_);
            int col = Mathf.RoundToInt(dify / tileHeight_);

            if (row >= 0 && row < rows && col >= 0 && col < cols)
            {
                Tile tileComponent = board_[col * rows + row].GetComponent<Tile>();
                if(!tileComponent.isPressed())
                    tileComponent.setPressed(true);
            }
        }
    }
}
