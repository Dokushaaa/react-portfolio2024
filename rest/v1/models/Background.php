<?php

Class Background {
    public $background_aid;
    public $background_title;
    public $background_description;
    public $background_image;
    public $background_is_active;
    public $background_published_date;
    public $background_created;
    public $background_datetime;
    
    public $background_search;
    public $connection;
    public $lastInsertedId;
    public $tblbackground;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblbackground = "tbl_background";
    }

    public function create() {
        try {
             $sql = "insert into {$this->tblbackground} ";
             $sql .= "( background_title, ";
             $sql .= "background_description, ";
             $sql .= "background_image, ";
             $sql .= "background_is_active, ";
             $sql .= "background_published_date, ";
             $sql .= "background_created, ";
             $sql .= "background_datetime ) values ( ";
             $sql .= ":background_title, ";
             $sql .= ":background_description, ";
             $sql .= ":background_image, ";
             $sql .= ":background_is_active, ";
             $sql .= ":background_published_date, ";
             $sql .= ":background_created, ";
             $sql .= ":background_datetime ) ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                "background_title" => $this->background_title,
                "background_description" => $this->background_description,
                "background_image" => $this->background_image,
                "background_is_active" => $this->background_is_active,
                "background_published_date" => $this->background_published_date,
                "background_description" => $this->background_description,
                "background_created" => $this->background_created,
                "background_datetime" => $this->background_datetime,
             ]);
        $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        
        return $query;
    }
    
    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblbackground} ";
            $sql .= "order by background_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblbackground} ";
            $sql .= "where background_aid = :background_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "background_aid" => $this->background_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblbackground} set ";
            $sql .= "background_title = :background_title, ";
            $sql .= "background_description = :background_description, ";
            $sql .= "background_image = :background_image, ";     
            $sql .= "background_published_date = :background_published_date, ";
            $sql .= "background_datetime = :background_datetime ";
            $sql .= "where background_aid = :background_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "background_title" => $this->background_title,
                "background_description" => $this->background_description,
                "background_image" => $this->background_image,
                "background_published_date" => $this->background_published_date,
                "background_datetime" => $this->background_datetime,
                "background_aid" => $this->background_aid,
         
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = "update {$this->tblbackground} set ";
            $sql .= "background_is_active = :background_is_active, ";
            $sql .= "background_datetime = :background_datetime ";
            $sql .= "where background_aid  = :background_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "background_is_active" => $this->background_is_active,
                "background_datetime" => $this->background_datetime,
                "background_aid" => $this->background_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblbackground} ";
            $sql .= "where background_title like :background_title ";
            $sql .= "order by background_is_active desc, ";
            $sql .= "background_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "background_title" => "%{$this->background_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}