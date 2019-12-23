using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BoardManager : MonoBehaviour
{
    private List<GameObject> board_; // tabla (lista) de Tiles
    private List<bool> boolBoard_;   // tabla (lista) auxiliar de bool (Tile pulsado o no)
    private List<int> path_;         // lista con los indices de la tabla que forman parte del camino
    private float tileWidth_, tileHeight_;
    private int baseWidth_ = 250;
    private float factor_;

    public int rows = 3, cols = 3;
    public SpriteRenderer tracker_;  // huella que deja el dedo al pulsar
    public GameObject tilePrefab_;   // modelo de tile a instanciar
    
    void Start()
    {
        board_ = new List<GameObject>();
        boolBoard_ = new List<bool>();
        path_ = new List<int>();

        tracker_.gameObject.SetActive(false);

        tileWidth_ = transform.localScale.x;
        tileHeight_ = transform.localScale.y;

        LoadTiles();

        factor_ = (float)Camera.main.scaledPixelWidth / (float)baseWidth_;
        Vector3 aux = transform.localScale * factor_;
        transform.localScale = aux;
        aux = transform.position * factor_;
        transform.position = aux;
    }

    /// <summary>
    /// Carga rows * cols Tiles, los instancia en posiciones consecutivas y los añade a board_, formando una matriz de Tiles
    /// de dimensiones rows * cols. Establece el punto de inicio del camino (marca el primer Tile)
    /// </summary>
    private void LoadTiles()
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
        PressTile(12, true); // inicial
    }
    
    void Update()
    {
        HandleInput();
    }

#if (!UNITY_EDITOR && UNITY_ANDROID || UNITY_IOS)
    /// <summary>
    /// Gestor de Input en dispositivos moviles. Recoge el evento de pulsacion del primer dedo (solo uno permitido en la aplicacion)
    /// Dedo pulsado: pasa la posicion a coordenadas del tablero (num col y num row), activa la huella y procesa el input en esa posicion
    /// Dedo levantado: desactiva la huella y se comprueba si ha completado el camino
    /// </summary>
    private void HandleInput()
    {
        if (Input.touches.Length != 0)
        {
            foreach (Touch touch in Input.touches)
            {
                if (touch.fingerId == 0 && touch.phase != TouchPhase.Canceled)
                {
                    if (touch.phase != TouchPhase.Ended) // dedo pulsado
                    {
                        Vector3 touchPos = PositionToWorldCoordinates(touch.position);

                        tracker_.transform.position = touchPos;
                        tracker_.gameObject.SetActive(false);

                        if (IsInsideBoard(touchPos))
                        {
                            int col, row;
                            ParseToBoardPosition(touchPos, out col, out row);

                            tracker_.gameObject.SetActive(true);

                            ProcessInput(col, row);
                        }
                    }
                    else // dedo levantado
                    {
                        tracker_.gameObject.SetActive(false);
                        // mirar si ha ganado
                    }
                    break;
                }
            }
        }
    }

#else
    /// <summary>
    /// Gestor de Input en PC. Recoge el evento de pulsacion del raton
    /// Raton pulsado: pasa la posicion a coordenadas del tablero (num col y num row), activa la huella y procesa el input en esa posicion
    /// Raton levantado: desactiva la huella y se comprueba si ha completado el camino
    /// </summary>
    private void HandleInput()
    {
        if (Input.GetMouseButton(0))
        {
            Vector3 mousePos = PositionToWorldCoordinates(Input.mousePosition);

            tracker_.transform.position = mousePos;
            tracker_.gameObject.SetActive(false);

            if (IsInsideBoard(mousePos))
            {
                int col, row;
                ParseToBoardPosition(mousePos, out col, out row);

                tracker_.gameObject.SetActive(true);

                ProcessInput(col, row);
            }
        }
        else if (Input.GetMouseButtonUp(0))
        {
            tracker_.gameObject.SetActive(false);
            // mirar si ha ganado
        }
    }
#endif

    /// <summary>
    /// Transforma una posicion a coordenadas del mundo
    /// </summary>
    /// <param name="pos">Posicion a transformar</param>
    /// <returns>Transformacion a coordenadas del mundo</returns>
    private Vector3 PositionToWorldCoordinates(Vector3 pos)
    {
        Vector3 processedPos = Camera.main.ScreenToWorldPoint(pos);
        processedPos = transform.InverseTransformPoint(processedPos);
        processedPos += transform.position;

        processedPos.z = -1;

        return processedPos;
    }

    /// <summary>
    /// Parsea una posicion a coordenadas del tablero de tiles (numero de fila y columna)
    /// </summary>
    /// <param name="pos">Posicion a parsear, asumiendo que esta en coordenadas del mundo</param>
    /// <param name="col">Numero de columna de "pos" dentro del tablero, adquiere valor dentro del metodo</param>
    /// <param name="row">Numero de fila de "pos" dentro del tablero, adquiere valor dentro del metodo</param>
    private void ParseToBoardPosition(Vector3 pos, out int col, out int row)
    {
        float difx = Mathf.Abs(transform.position.x - pos.x);
        float dify = Mathf.Abs(transform.position.y - pos.y);
        col = Mathf.RoundToInt(difx / tileWidth_);
        row = Mathf.RoundToInt(dify / tileHeight_);
    }

    /// <summary>
    /// Dada la posicion del tablero que se ha pulsado: si el Tile no estaba pulsado y es adyacente al camino actual,
    /// lo selecciona. Si el Tile estaba ya pulsado, deselecciona todos los Tiles que formaban parte del camino actual hasta
    /// este Tile, sin incluirle.
    /// </summary>
    /// <param name="col">Numero de columna del Tile pulsado</param>
    /// <param name="row">Numero de fila del Tile pulsado</param>
    private void ProcessInput(int col, int row)
    {
        int i = row * cols + col;
        if (!boolBoard_[i] && IsAdyacentToPath(i))
        {
            PressTile(i, true);
        }
        else if (boolBoard_[i])
        {
            int indexInPath = path_.IndexOf(i);
            for (int currentCount = path_.Count - 1; indexInPath == -1 || currentCount > indexInPath; currentCount--)
            {
                PressTile(path_[currentCount], false);
            }
        }
    }

    /// <summary>
    /// Dado un index de la tabla de tiles, lo establece a seleccionado o no
    /// Si se selecciona, se anyade al camino actual
    /// Si se deselecciona, se quita del camino actual
    /// </summary>
    /// <param name="boardIndex">Index de la tabla a tratar</param>
    /// <param name="pressed">Si se selecciona o no</param>
    private void PressTile(int boardIndex, bool pressed)
    {
        Tile tileComponent = board_[boardIndex].GetComponent<Tile>();
        boolBoard_[boardIndex] = pressed;
        tileComponent.setPressed(pressed);

        if (pressed)
        {
            if (path_.Count > 0) // se anyade a un camino existente
            {
                int lastTileIndex = path_[path_.Count - 1];
                Tile.Direction dir = Tile.Direction.UNDEFINED;
                if (boardIndex == lastTileIndex + 1) dir = Tile.Direction.LEFT;
                else if (boardIndex == lastTileIndex - 1) dir = Tile.Direction.RIGHT;
                else if (boardIndex == lastTileIndex - cols) dir = Tile.Direction.UP;
                else if (boardIndex == lastTileIndex + cols) dir = Tile.Direction.DOWN;
                tileComponent.addPath(dir);
            }

            path_.Add(boardIndex); // se anyade como inicio de camino
        }
        else path_.Remove(boardIndex);
    }

    /// <summary>
    /// Indica si una posicion (en coordenadas del mundo) esta dentro o no del tablero de tiles
    /// </summary>
    private bool IsInsideBoard(Vector2 pos)
    {
        return (pos.x >= transform.position.x - tileWidth_ / 2 && pos.x < transform.position.x + cols * tileWidth_ - tileWidth_ / 2
                && pos.y >= transform.position.y - tileHeight_ / 2 && pos.y < transform.position.y + cols * tileHeight_ - tileHeight_ / 2);
    }

    /// <summary>
    /// Indica si un index es adyacente (arriba, abajo, izquierda, derecha) al camino actual
    /// </summary>
    private bool IsAdyacentToPath(int index)
    {
        return (((index + 1 == path_[path_.Count - 1] || index - 1 == path_[path_.Count - 1]) 
            && index /cols == path_[path_.Count - 1]/cols) ||                                  // izq-der
            index + cols == path_[path_.Count - 1] || index - cols == path_[path_.Count - 1]); // arriba-abajo
    }
}
