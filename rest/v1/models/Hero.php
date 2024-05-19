<?php

Class Hero {
    public $hero_aid;
    public $hero_title;
    public $hero_description;
    public $hero_context;
    public $hero_image;
    public $hero_is_active;
    public $hero_published_date;
    public $hero_created;
    public $hero_datetime;
    
    public $hero_search;
    public $connection;
    public $lastInsertedId;
    public $tblhero;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblhero = "tbl_hero";
    }

    public function create() {
        try {
             $sql = "insert into {$this->tblhero} ";
             $sql .= "( hero_title, ";
             $sql .= "hero_description, ";
             $sql .= "hero_context, ";
             $sql .= "hero_image, ";
             $sql .= "hero_is_active, ";
             $sql .= "hero_published_date, ";
             $sql .= "hero_created, ";
             $sql .= "hero_datetime ) values ( ";
             $sql .= ":hero_title, ";
             $sql .= ":hero_description, ";
             $sql .= ":hero_context, ";
             $sql .= ":hero_image, ";
             $sql .= ":hero_is_active, ";
             $sql .= ":hero_published_date, ";
             $sql .= ":hero_created, ";
             $sql .= ":hero_datetime ) ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                "hero_title" => $this->hero_title,
                "hero_description" => $this->hero_description,
                "hero_context" => $this->hero_context,
                "hero_image" => $this->hero_image,
                "hero_is_active" => $this->hero_is_active,
                "hero_published_date" => $this->hero_published_date,
                "hero_created" => $this->hero_created,
                "hero_datetime" => $this->hero_datetime,
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
            $sql .= "from {$this->tblhero} ";
            $sql .= "order by hero_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblhero} ";
            $sql .= "where hero_aid = :hero_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "hero_aid" => $this->hero_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblhero} set ";
            $sql .= "hero_title = :hero_title, ";
            $sql .= "hero_description = :hero_description, ";
            $sql .= "hero_context = :hero_context, ";
            $sql .= "hero_image = :hero_image, ";     
            $sql .= "hero_published_date = :hero_published_date, ";
            $sql .= "hero_datetime = :hero_datetime ";
            $sql .= "where hero_aid = :hero_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "hero_title" => $this->hero_title,
                "hero_description" => $this->hero_description,
                "hero_context" => $this->hero_context,
                "hero_image" => $this->hero_image,
                "hero_published_date" => $this->hero_published_date,
                "hero_datetime" => $this->hero_datetime,
                "hero_aid" => $this->hero_aid,
         
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = "update {$this->tblhero} set ";
            $sql .= "hero_is_active = :hero_is_active, ";
            $sql .= "hero_datetime = :hero_datetime ";
            $sql .= "where hero_aid  = :hero_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "hero_is_active" => $this->hero_is_active,
                "hero_datetime" => $this->hero_datetime,
                "hero_aid" => $this->hero_aid,
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
            $sql .= "from {$this->tblhero} ";
            $sql .= "where hero_title like :hero_title ";
            $sql .= "order by hero_is_active desc, ";
            $sql .= "hero_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "hero_title" => "%{$this->hero_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}