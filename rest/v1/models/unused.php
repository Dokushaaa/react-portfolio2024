<?php

Class Portfolio {
    public $portfolio_aid;
    public $portfolio_title;
    public $portfolio_category;
    public $portfolio_image;
    public $portfolio_is_active;
    public $portfolio_published_date;
    public $portfolio_description;
    public $portfolio_created;
    public $portfolio_datetime;
    
    public $portfolio_search;
    public $connection;
    public $lastInsertedId;
    public $tblPortfolio;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblPortfolio = "tbl_portfolio";
    }

    public function create() {
        try {
             $sql = "insert into {$this->tblPortfolio} ";
             $sql .= "( portfolio_title, ";
             $sql .= "portfolio_category, ";
             $sql .= "portfolio_image, ";
             $sql .= "portfolio_is_active, ";
             $sql .= "portfolio_published_date, ";
             $sql .= "portfolio_description, ";
             $sql .= "portfolio_created, ";
             $sql .= "portfolio_datetime ) values ( ";
             $sql .= ":portfolio_title, ";
             $sql .= ":portfolio_category, ";
             $sql .= ":portfolio_image, ";
             $sql .= ":portfolio_is_active, ";
             $sql .= ":portfolio_published_date, ";
             $sql .= ":portfolio_description, ";
             $sql .= ":portfolio_created, ";
             $sql .= ":portfolio_datetime ) ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                "portfolio_title" => $this->portfolio_title,
                "portfolio_category" => $this->portfolio_category,
                "portfolio_image" => $this->portfolio_image,
                "portfolio_is_active" => $this->portfolio_is_active,
                "portfolio_published_date" => $this->portfolio_published_date,
                "portfolio_description" => $this->portfolio_description,
                "portfolio_created" => $this->portfolio_created,
                "portfolio_datetime" => $this->portfolio_datetime,
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
            $sql .= "from {$this->tblPortfolio} ";
            $sql .= "order by portfolio_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblPortfolio} ";
            $sql .= "where portfolio_aid = :portfolio_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "portfolio_aid" => $this->portfolio_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function update()
    {
        try {
            $sql = "update {$this->tblPortfolio} set ";
            $sql .= "portfolio_title = :portfolio_title, ";
            $sql .= "portfolio_category = :portfolio_category, ";
            $sql .= "portfolio_image = :portfolio_image, ";     
            $sql .= "portfolio_published_date = :portfolio_published_date, ";
            $sql .= "portfolio_description = :portfolio_description, ";   
            $sql .= "portfolio_datetime = :portfolio_datetime ";
            $sql .= "where portfolio_aid = :portfolio_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "portfolio_title" => $this->portfolio_title,
                "portfolio_category" => $this->portfolio_category,
                "portfolio_image" => $this->portfolio_image,
                "portfolio_published_date" => $this->portfolio_published_date,
                "portfolio_description" => $this->portfolio_description,
                "portfolio_datetime" => $this->portfolio_datetime,
                "portfolio_aid" => $this->portfolio_aid,
         
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = "update {$this->tblPortfolio} set ";
            $sql .= "portfolio_is_active = :portfolio_is_active, ";
            $sql .= "portfolio_datetime = :portfolio_datetime ";
            $sql .= "where portfolio_aid  = :portfolio_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "portfolio_is_active" => $this->portfolio_is_active,
                "portfolio_datetime" => $this->portfolio_datetime,
                "portfolio_aid" => $this->portfolio_aid,
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
            $sql .= "from {$this->tblPortfolio} ";
            $sql .= "where portfolio_title like :portfolio_title ";
            $sql .= "order by portfolio_is_active desc, ";
            $sql .= "portfolio_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "portfolio_title" => "%{$this->portfolio_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}